# from .models import Provincia, Alicuota_IVA, Codigo_Postal, Condicion_IVA, Tipo_Documento, Comprobante, TIPO_COMPROBANTE_CHOICES
# from .serializers import ProvinciaSerializer, AlicuotaIVASerializer, CodigoPostalSerializer, CondicionIVASerializer, TipoDocumentoSerializer, ComprobanteSerializer
from rest_framework.response import Response
from rest_framework import viewsets, permissions, generics
from .serializers import FacturaSerializer
from .factura_electronica import facturar
from agencias.models import Comprobante_PtoVenta, Punto_Venta, Agencia
from bases.models import Empresa, Empresa_WS
from clientes.models import Cliente


class FacturaAPIView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = FacturaSerializer

    def get(self, request):
        return Response("Esperando datos")

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        datos = serializer.validated_data

        # busco puntoventa y empresa
        ptoventa = Punto_Venta.objects.get(pk=datos['puntoventa'])
        id_empresa = ptoventa.agencia.empresa

        # busco datos empresa perteneciente al puntoventa
        empresa = Empresa_WS.objects.get(pk=id_empresa)
        datosEmpresa = dict(
            nombre=empresa.empresa.nombre,
            domicilio=empresa.empresa.domicilio,
            localidad=empresa.empresa.codigo_postal.localidad,
            cuit=int(empresa.empresa.cuit),
            iibb=empresa.empresa.iibb,
            iva=empresa.empresa.iva.nombre,
            inicio_act=empresa.empresa.inicio_actividades,
            logo=empresa.empresa.logo.url,
            cert=empresa.afip_file_certificado,
            privatekey=empresa.afip_file_key,
            homo=empresa.homo,
        )

        # busco cliente
        obj_cliente = Cliente.objects.get(pk=datos['cliente'])
        datosCliente = dict(
            nombre=obj_cliente.nombre,
            domicilio=obj_cliente.domicilio,
            tipo_documento=obj_cliente.tipo_documento.codigo,
            nro_documento=obj_cliente.nro_documento,
            localidad=obj_cliente.codigo_postal.localidad,
            provincia=obj_cliente.codigo_postal.provincia.nombre
        )

        datosComprobante = dict(
            tipo_cbte=datos['comprobante_afip'],
            punto_vta=ptoventa.punto_venta,
            periodo_desde="20190101",
            periodo_hasta="20190101",
        )

        datosItem = [
            {"descripcion": "Cuota Enero", "precio": 300.00},
            {"descripcion": "Cuota Febrero", "precio": 350.00},
            {"descripcion": "Cuota Marzo", "precio": 400.00},
        ]

        items = dict(
            items=datosItem
        )

        facturas = [{**datosCliente, **datosComprobante, **items}]
        print(facturas)
        ok = facturar(facturas, datosEmpresa)

        return Response(ok)
