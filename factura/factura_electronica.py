#!/usr/bin/python
# -*- coding: utf8 -*-
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by the
# Free Software Foundation; either version 3, or (at your option) any later
# version.
#
# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTIBILITY
# or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
# for more details.
from bases.funciones import current_date_format

from django.http import FileResponse

from pyafipws.wsaa import WSAA
from pyafipws.wsfev1 import WSFEv1
from pyafipws.pyfepdf import FEPDF

"Ejemplo completo para WSFEv1 de AFIP (Factura Electrónica Mercado Interno)"

__author__ = "Mariano Reingart <reingart@gmail.com>"
__copyright__ = "Copyright (C) 2010 - 2019 Mariano Reingart"
__license__ = "GPL 3.0"

import os
import time
import sys
from decimal import Decimal
import datetime
import warnings
import configparser


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PYAFIPWS_DIRS = os.path.join(BASE_DIR, 'pyafipws')
CACHE = os.path.join(PYAFIPWS_DIRS, 'cache')


def facturar(registros, empresa):
    """Rutina para emitir facturas electrónicas en PDF c/CAE AFIP Argentina"""

    CONF_PDF = dict(
        LOGO=os.path.join(BASE_DIR) + empresa["logo"],
        EMPRESA=empresa["nombre"],
        MEMBRETE1=empresa["domicilio"],
        MEMBRETE2=empresa["localidad"],
        CUIT="CUIT " + str(empresa["cuit"]),
        IIBB="IIBB " + empresa["iibb"],
        IVA="IVA " + empresa["iva"],
        INICIO="Inicio de Actividad: " +
            current_date_format(empresa["inicio_act"]),
    )

    # inicialización AFIP:
    wsaa = WSAA()
    wsfev1 = WSFEv1()

    # Leo condig.cfg para obtener url de afip
    configuracion = configparser.ConfigParser()
    configuracion.read(PYAFIPWS_DIRS+'/conf/config.cfg')
    if empresa["homo"]:
        URL_WSAA = configuracion['WSAA']['URLHOMO']
        URL_WSFEv1 = configuracion['WSFEV1']['URLHOMO']
    else:
        URL_WSAA = configuracion['WSAA']['URLPROD']
        URL_WSFEv1 = configuracion['WSFEV1']['URLPROD']

    # obtener ticket de acceso (token y sign):
    CERT = PYAFIPWS_DIRS+'/'+empresa["cert"]
    PRIVATEKEY = PYAFIPWS_DIRS+"/"+empresa["privatekey"]
    ta = wsaa.Autenticar("wsfe", CERT, PRIVATEKEY,
                         wsdl=URL_WSAA, cache=CACHE, debug=True)
    wsfev1.Cuit = empresa["cuit"]
    wsfev1.SetTicketAcceso(ta)
    wsfev1.Conectar(CACHE, URL_WSFEv1)

    # inicialización PDF
    fepdf = FEPDF()
    fepdf.CargarFormato("factura.csv")
    fepdf.FmtCantidad = "0.2"
    fepdf.FmtPrecio = "0.2"
    fepdf.CUIT = empresa["cuit"]
    for k, v in CONF_PDF.items():
        fepdf.AgregarDato(k, v)

    if "homo" in URL_WSAA:
        fepdf.AgregarCampo("DEMO", 'T', 120, 260, 0, 0, text="DEMOSTRACION",
                           size=70, rotate=45, foreground=0x808080, priority=-1)
        fepdf.AgregarDato("motivos_obs", "Ejemplo Sin validez fiscal")

    # recorrer los registros a facturar, solicitar CAE y generar el PDF:
    for reg in registros:
        hoy = datetime.date.today().strftime("%Y%m%d")
        cbte = Comprobante(tipo_cbte=reg["tipo_cbte"],
                           punto_vta=reg["punto_vta"],
                           fecha_cbte=hoy,
                           cbte_nro=reg.get("nro"),
                           tipo_doc=reg["tipo_documento"],
                           nro_doc=reg["nro_documento"],
                           nombre_cliente=reg["nombre"],
                           domicilio_cliente=reg["domicilio"],
                           fecha_serv_desde=reg.get("periodo_desde"),
                           fecha_serv_hasta=reg.get("periodo_hasta"),
                           fecha_venc_pago=reg.get("venc_pago", hoy),
                           )
        for item in reg["items"]:
            cbte.agregar_item(ds=item["descripcion"],
                              qty=item.get("cantidad", 1),
                              precio=item.get("precio", 0),
                              tasa_iva=item.get("tasa_iva", 21.),
                              )
        ok = cbte.autorizar(wsfev1)
        nro = cbte.encabezado["cbte_nro"]
        #print("Factura autorizada", nro, cae)
        if "homo" in URL_WSFEv1:
            cbte.encabezado["motivos_obs"] = "Ejemplo Sin validez fiscal"
        ok = cbte.generar_pdf(fepdf, PYAFIPWS_DIRS +
                              "/{0}_{1}_factura.pdf".format(empresa["cuit"], reg["punto_vta"]))
        print("PDF generado", ok)
        # cbte.download(=ok, pdf=ok)

        return (cbte.encabezado)


class Comprobante:

    def __init__(self, **kwargs):
        self.encabezado = dict(
            tipo_doc=99, nro_doc=0,
            tipo_cbte=6, cbte_nro=None, punto_vta=4000, fecha_cbte=None,
            imp_total=0.00, imp_tot_conc=0.00, imp_neto=0.00,
            imp_trib=0.00, imp_op_ex=0.00, imp_iva=0.00,
            moneda_id='PES', moneda_ctz=1.000,
            obs="Observaciones Comerciales, libre",
            concepto=1, fecha_serv_desde=None, fecha_serv_hasta=None,
            fecha_venc_pago=None,
            nombre_cliente='', domicilio_cliente='',
            localidad='', provincia='',
            pais_dst_cmp=200, id_impositivo='Consumidor Final',
            forma_pago='30 dias',
            obs_generales="Observaciones Generales<br/>linea2",
            obs_comerciales="Observaciones Comerciales<br/>texto libre",
            motivo_obs="", cae="", resultado='', fch_venc_cae=""
        )
        self.encabezado.update(kwargs)
        if self.encabezado['fecha_serv_desde'] or self.encabezado["fecha_serv_hasta"]:
            self.encabezado["concepto"] = 3          # servicios
        self.cmp_asocs = []
        self.items = []
        self.ivas = {}

    def agregar_item(self, ds="Descripcion del producto P0001",
                     qty=1, precio=0, tasa_iva=21., umed=7, codigo="P0001"):
        """Agregar producto / servicio facturado (calculando IVA)"""
        # detalle de artículos:
        item = dict(
            u_mtx=123456, cod_mtx=1234567890123, codigo=codigo, ds=ds,
            qty=qty, umed=umed, bonif=0.00,
            despacho=u'Nº 123456', dato_a="Dato A",
        )
        subtotal = precio * qty
        if tasa_iva:
            iva_id = {10.5: 4, 0: 3, 21: 5, 27: 6}[tasa_iva]
            item["iva_id"] = iva_id
            # discriminar IVA si es clase A / M
            iva_liq = subtotal * tasa_iva / 100.
            self.agergar_iva(iva_id, subtotal, iva_liq)
            self.encabezado["imp_neto"] += subtotal
            self.encabezado["imp_iva"] += iva_liq
            if self.encabezado["tipo_cbte"] in (1, 2, 3, 4, 5, 34, 39, 51, 52, 53, 54, 60, 64):
                item["precio"] = precio / (1. + tasa_iva/100.)
                item["imp_iva"] = precio * (tasa_iva/100.)
            else:
                # no discriminar IVA si es clase B (importe final iva incluido)
                item["precio"] = precio * (1. + tasa_iva/100.)
                item["imp_iva"] = None
                subtotal += iva_liq
                iva_liq = 0
        else:
            item["precio"] = precio
            item["imp_iva"] = None
            if tasa_iva is None:
                self.encabezado["imp_tot_conc"] += subtotal     # No gravado
            else:
                self.encabezado["imp_op_ex"] += subtotal        # Exento
        item["importe"] = subtotal
        self.encabezado["imp_total"] += subtotal + iva_liq
        self.items.append(item)

    def agergar_iva(self, iva_id, base_imp, importe):
        iva = self.ivas.setdefault(iva_id, dict(
            iva_id=iva_id, base_imp=0., importe=0.))
        iva["base_imp"] += base_imp
        iva["importe"] += importe

    def autorizar(self, wsfev1):
        "Prueba de autorización de un comprobante (obtención de CAE)"

        # datos generales del comprobante:
        if not self.encabezado["cbte_nro"]:
            # si no se especifíca nro de comprobante, autonumerar:
            ult = wsfev1.CompUltimoAutorizado(
                self.encabezado["tipo_cbte"], self.encabezado["punto_vta"])
            self.encabezado["cbte_nro"] = int(ult) + 1

        self.encabezado["cbt_desde"] = self.encabezado["cbte_nro"]
        self.encabezado["cbt_hasta"] = self.encabezado["cbte_nro"]
        wsfev1.CrearFactura(**self.encabezado)

        # agrego un comprobante asociado (solo notas de crédito / débito)
        for cmp_asoc in self.cmp_asocs:
            wsfev1.AgregarCmpAsoc(**cmp_asoc)

        # agrego el subtotal por tasa de IVA (iva_id 5: 21%):
        for iva in self.ivas.values():
            wsfev1.AgregarIva(**iva)

        # llamo al websevice para obtener el CAE:
        wsfev1.CAESolicitar()

        if wsfev1.ErrMsg:
            raise RuntimeError(wsfev1.ErrMsg)

        for obs in wsfev1.Observaciones:
            warnings.warn(obs)

        assert wsfev1.Resultado == "A"    # Aprobado!
        assert wsfev1.CAE
        assert wsfev1.Vencimiento

        self.encabezado["resultado"] = wsfev1.Resultado
        self.encabezado["cae"] = wsfev1.CAE
        self.encabezado["fch_venc_cae"] = wsfev1.Vencimiento
        return True

    def generar_pdf(self, fepdf, salida="/tmp/factura.pdf"):

        fepdf.CrearFactura(**self.encabezado)

        # completo campos extra del encabezado:
        ok = fepdf.EstablecerParametro(
            "localidad_cliente", self.encabezado["localidad"])
        ok = fepdf.EstablecerParametro(
            "provincia_cliente", self.encabezado["provincia"])

        # imprimir leyenda "Comprobante Autorizado" (constatar con WSCDC!)
        ok = fepdf.EstablecerParametro(
            "resultado", self.encabezado["resultado"])

        # detalle de artículos:
        for item in self.items:
            fepdf.AgregarDetalleItem(**item)

        # agrego remitos y otros comprobantes asociados:
        for cmp_asoc in self.cmp_asocs:
            fepdf.AgregarCmpAsoc(**cmp_asoc)

        # agrego el subtotal por tasa de IVA (iva_id 5: 21%):
        for iva in self.ivas.values():
            fepdf.AgregarIva(**iva)

        # armar el PDF:
        fepdf.CrearPlantilla(papel="A4", orientacion="portrait")
        fepdf.ProcesarPlantilla(num_copias=1, lineas_max=24, qty_pos='izq')
        fepdf.GenerarPDF(archivo=salida)
        return salida

    def download(self, archivo):
        try:
            response = FileResponse(open(archivo, 'rb'))
            response['Content-Type'] = 'application/octet-stream'
            response['Content-Disposition'] = 'attachment;filename="{0}"'.format(
                os.path.basename(archivo))
            response['Content-Length'] = os.path.getsize(archivo)
            return response
        except Exception as e:
            print(e)
            return e.args
