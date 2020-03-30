--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_profile (
    user_id integer NOT NULL,
    image character varying(100) NOT NULL,
    domicilio character varying(150),
    telefono character varying(150)
);


ALTER TABLE public.accounts_profile OWNER TO postgres;

--
-- Name: accounts_profile_agencias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_profile_agencias (
    id integer NOT NULL,
    profile_id integer NOT NULL,
    agencia_id integer NOT NULL
);


ALTER TABLE public.accounts_profile_agencias OWNER TO postgres;

--
-- Name: accounts_profile_agencias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_profile_agencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_profile_agencias_id_seq OWNER TO postgres;

--
-- Name: accounts_profile_agencias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_profile_agencias_id_seq OWNED BY public.accounts_profile_agencias.id;


--
-- Name: agencias_agencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencias_agencia (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    nombre character varying(150) NOT NULL,
    domicilio character varying(150) NOT NULL,
    telefono character varying(150) NOT NULL,
    porcentaje double precision NOT NULL,
    "porcentaje_Bs_As" double precision NOT NULL,
    logo character varying(100) NOT NULL,
    codigo_postal_id character varying(4) NOT NULL,
    empresa_id integer NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.agencias_agencia OWNER TO postgres;

--
-- Name: agencias_agencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencias_agencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agencias_agencia_id_seq OWNER TO postgres;

--
-- Name: agencias_agencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencias_agencia_id_seq OWNED BY public.agencias_agencia.id;


--
-- Name: agencias_agencia_localidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencias_agencia_localidades (
    id integer NOT NULL,
    agencia_id integer NOT NULL,
    codigo_postal_id character varying(4) NOT NULL
);


ALTER TABLE public.agencias_agencia_localidades OWNER TO postgres;

--
-- Name: agencias_agencia_localidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencias_agencia_localidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agencias_agencia_localidades_id_seq OWNER TO postgres;

--
-- Name: agencias_agencia_localidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencias_agencia_localidades_id_seq OWNED BY public.agencias_agencia_localidades.id;


--
-- Name: agencias_cobrador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencias_cobrador (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    nombre character varying(100) NOT NULL,
    domicilio character varying(100),
    telefono character varying(100),
    agencia_id integer NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.agencias_cobrador OWNER TO postgres;

--
-- Name: agencias_cobrador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencias_cobrador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agencias_cobrador_id_seq OWNER TO postgres;

--
-- Name: agencias_cobrador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencias_cobrador_id_seq OWNED BY public.agencias_cobrador.id;


--
-- Name: agencias_comprobante_ptoventa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencias_comprobante_ptoventa (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    punto_venta integer NOT NULL,
    numero integer NOT NULL,
    agencia_id integer NOT NULL,
    comprobante_id integer NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.agencias_comprobante_ptoventa OWNER TO postgres;

--
-- Name: agencias_comprobante_ptoventa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencias_comprobante_ptoventa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agencias_comprobante_ptoventa_id_seq OWNER TO postgres;

--
-- Name: agencias_comprobante_ptoventa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencias_comprobante_ptoventa_id_seq OWNED BY public.agencias_comprobante_ptoventa.id;


--
-- Name: agencias_tarifa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencias_tarifa (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    nombre character varying(100) NOT NULL,
    agencia_id integer NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.agencias_tarifa OWNER TO postgres;

--
-- Name: agencias_tarifa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencias_tarifa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agencias_tarifa_id_seq OWNER TO postgres;

--
-- Name: agencias_tarifa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencias_tarifa_id_seq OWNED BY public.agencias_tarifa.id;


--
-- Name: agencias_zona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencias_zona (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    nombre character varying(100) NOT NULL,
    agencia_id integer NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.agencias_zona OWNER TO postgres;

--
-- Name: agencias_zona_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencias_zona_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agencias_zona_id_seq OWNER TO postgres;

--
-- Name: agencias_zona_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencias_zona_id_seq OWNED BY public.agencias_zona.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: bases_alicuota_iva; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases_alicuota_iva (
    id integer NOT NULL,
    nombre character varying(20) NOT NULL,
    tasa double precision NOT NULL,
    "codigo_Afip" character varying(4) NOT NULL
);


ALTER TABLE public.bases_alicuota_iva OWNER TO postgres;

--
-- Name: bases_alicuota_iva_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bases_alicuota_iva_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bases_alicuota_iva_id_seq OWNER TO postgres;

--
-- Name: bases_alicuota_iva_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bases_alicuota_iva_id_seq OWNED BY public.bases_alicuota_iva.id;


--
-- Name: bases_codigo_postal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases_codigo_postal (
    codigo character varying(4) NOT NULL,
    localidad character varying(100) NOT NULL,
    provincia_id character varying(1) NOT NULL
);


ALTER TABLE public.bases_codigo_postal OWNER TO postgres;

--
-- Name: bases_comprobante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases_comprobante (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    "codigo_AFIP" character varying(3),
    descripcion character varying(100) NOT NULL,
    tipo_comprobante character varying(1) NOT NULL,
    es_sistema boolean NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.bases_comprobante OWNER TO postgres;

--
-- Name: bases_comprobante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bases_comprobante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bases_comprobante_id_seq OWNER TO postgres;

--
-- Name: bases_comprobante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bases_comprobante_id_seq OWNED BY public.bases_comprobante.id;


--
-- Name: bases_condicion_iva; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases_condicion_iva (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    codigo_afip integer
);


ALTER TABLE public.bases_condicion_iva OWNER TO postgres;

--
-- Name: bases_condicion_iva_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bases_condicion_iva_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bases_condicion_iva_id_seq OWNER TO postgres;

--
-- Name: bases_condicion_iva_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bases_condicion_iva_id_seq OWNED BY public.bases_condicion_iva.id;


--
-- Name: bases_empresa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases_empresa (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    nombre character varying(150) NOT NULL,
    domicilio character varying(150) NOT NULL,
    telefono character varying(150) NOT NULL,
    cuit character varying(150) NOT NULL,
    inicio_actividades date,
    iibb character varying(50) NOT NULL,
    logo character varying(100) NOT NULL,
    codigo_postal_id character varying(4) NOT NULL,
    iva_id integer NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.bases_empresa OWNER TO postgres;

--
-- Name: bases_empresa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bases_empresa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bases_empresa_id_seq OWNER TO postgres;

--
-- Name: bases_empresa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bases_empresa_id_seq OWNED BY public.bases_empresa.id;


--
-- Name: bases_provincia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases_provincia (
    codigo character varying(1) NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.bases_provincia OWNER TO postgres;

--
-- Name: bases_tipo_documento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases_tipo_documento (
    codigo integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.bases_tipo_documento OWNER TO postgres;

--
-- Name: clientes_cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes_cliente (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    nombre character varying(150) NOT NULL,
    nro_documento character varying(11),
    domicilio character varying(150),
    telefono character varying(150),
    email character varying(150),
    representante character varying(150),
    codigo_postal_id character varying(4) NOT NULL,
    iva_id integer NOT NULL,
    tipo_documento_id integer NOT NULL,
    uc_id integer,
    um_id integer
);


ALTER TABLE public.clientes_cliente OWNER TO postgres;

--
-- Name: clientes_cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_cliente_id_seq OWNER TO postgres;

--
-- Name: clientes_cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_cliente_id_seq OWNED BY public.clientes_cliente.id;


--
-- Name: clientes_clientes_agencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes_clientes_agencia (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    agencia_id integer NOT NULL,
    cliente_id integer NOT NULL,
    cobrador_id integer NOT NULL,
    tarifa_id integer NOT NULL,
    uc_id integer,
    um_id integer,
    zona_id integer NOT NULL
);


ALTER TABLE public.clientes_clientes_agencia OWNER TO postgres;

--
-- Name: clientes_clientes_agencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_clientes_agencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_clientes_agencia_id_seq OWNER TO postgres;

--
-- Name: clientes_clientes_agencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_clientes_agencia_id_seq OWNED BY public.clientes_clientes_agencia.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: knox_authtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knox_authtoken (
    digest character varying(128) NOT NULL,
    salt character varying(16) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    expiry timestamp with time zone,
    token_key character varying(8) NOT NULL
);


ALTER TABLE public.knox_authtoken OWNER TO postgres;

--
-- Name: notificaciones_notificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones_notificacion (
    id integer NOT NULL,
    estado boolean NOT NULL,
    fc timestamp with time zone NOT NULL,
    fm timestamp with time zone NOT NULL,
    asunto character varying(50) NOT NULL,
    mensaje character varying(250) NOT NULL,
    prioridad character varying(1) NOT NULL,
    leida boolean NOT NULL,
    uc_id integer,
    um_id integer,
    user_destino_id integer NOT NULL
);


ALTER TABLE public.notificaciones_notificacion OWNER TO postgres;

--
-- Name: notificaciones_notificacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_notificacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notificaciones_notificacion_id_seq OWNER TO postgres;

--
-- Name: notificaciones_notificacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_notificacion_id_seq OWNED BY public.notificaciones_notificacion.id;


--
-- Name: accounts_profile_agencias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_profile_agencias ALTER COLUMN id SET DEFAULT nextval('public.accounts_profile_agencias_id_seq'::regclass);


--
-- Name: agencias_agencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia ALTER COLUMN id SET DEFAULT nextval('public.agencias_agencia_id_seq'::regclass);


--
-- Name: agencias_agencia_localidades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia_localidades ALTER COLUMN id SET DEFAULT nextval('public.agencias_agencia_localidades_id_seq'::regclass);


--
-- Name: agencias_cobrador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_cobrador ALTER COLUMN id SET DEFAULT nextval('public.agencias_cobrador_id_seq'::regclass);


--
-- Name: agencias_comprobante_ptoventa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_comprobante_ptoventa ALTER COLUMN id SET DEFAULT nextval('public.agencias_comprobante_ptoventa_id_seq'::regclass);


--
-- Name: agencias_tarifa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_tarifa ALTER COLUMN id SET DEFAULT nextval('public.agencias_tarifa_id_seq'::regclass);


--
-- Name: agencias_zona id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_zona ALTER COLUMN id SET DEFAULT nextval('public.agencias_zona_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: bases_alicuota_iva id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_alicuota_iva ALTER COLUMN id SET DEFAULT nextval('public.bases_alicuota_iva_id_seq'::regclass);


--
-- Name: bases_comprobante id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_comprobante ALTER COLUMN id SET DEFAULT nextval('public.bases_comprobante_id_seq'::regclass);


--
-- Name: bases_condicion_iva id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_condicion_iva ALTER COLUMN id SET DEFAULT nextval('public.bases_condicion_iva_id_seq'::regclass);


--
-- Name: bases_empresa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_empresa ALTER COLUMN id SET DEFAULT nextval('public.bases_empresa_id_seq'::regclass);


--
-- Name: clientes_cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente ALTER COLUMN id SET DEFAULT nextval('public.clientes_cliente_id_seq'::regclass);


--
-- Name: clientes_clientes_agencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia ALTER COLUMN id SET DEFAULT nextval('public.clientes_clientes_agencia_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: notificaciones_notificacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_notificacion ALTER COLUMN id SET DEFAULT nextval('public.notificaciones_notificacion_id_seq'::regclass);


--
-- Data for Name: accounts_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_profile (user_id, image, domicilio, telefono) FROM stdin;
1	profile_pics/avatar_ZPTDQCx.jpg	Malvinas 421	2281 651230
\.


--
-- Data for Name: accounts_profile_agencias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_profile_agencias (id, profile_id, agencia_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: agencias_agencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencias_agencia (id, estado, fc, fm, nombre, domicilio, telefono, porcentaje, "porcentaje_Bs_As", logo, codigo_postal_id, empresa_id, uc_id, um_id) FROM stdin;
1	t	2020-03-30 08:13:44.105017-03	2020-03-30 08:13:44.105017-03	AZUL	AV. MITRE 242	02281 424400	0	0	logo_pics/20181022_220224_L1eIYWY.jpg	7300	1	\N	\N
\.


--
-- Data for Name: agencias_agencia_localidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencias_agencia_localidades (id, agencia_id, codigo_postal_id) FROM stdin;
1	1	7300
\.


--
-- Data for Name: agencias_cobrador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencias_cobrador (id, estado, fc, fm, nombre, domicilio, telefono, agencia_id, uc_id, um_id) FROM stdin;
\.


--
-- Data for Name: agencias_comprobante_ptoventa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencias_comprobante_ptoventa (id, estado, fc, fm, punto_venta, numero, agencia_id, comprobante_id, uc_id, um_id) FROM stdin;
\.


--
-- Data for Name: agencias_tarifa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencias_tarifa (id, estado, fc, fm, nombre, agencia_id, uc_id, um_id) FROM stdin;
\.


--
-- Data for Name: agencias_zona; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencias_zona (id, estado, fc, fm, nombre, agencia_id, uc_id, um_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add permission	1	add_permission
2	Can change permission	1	change_permission
3	Can delete permission	1	delete_permission
4	Can view permission	1	view_permission
5	Can add group	2	add_group
6	Can change group	2	change_group
7	Can delete group	2	delete_group
8	Can view group	2	view_group
9	Can add user	3	add_user
10	Can change user	3	change_user
11	Can delete user	3	delete_user
12	Can view user	3	view_user
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add alicuota_iva	5	add_alicuota_iva
18	Can change alicuota_iva	5	change_alicuota_iva
19	Can delete alicuota_iva	5	delete_alicuota_iva
20	Can view alicuota_iva	5	view_alicuota_iva
21	Can add condicion_iva	6	add_condicion_iva
22	Can change condicion_iva	6	change_condicion_iva
23	Can delete condicion_iva	6	delete_condicion_iva
24	Can view condicion_iva	6	view_condicion_iva
25	Can add provincia	7	add_provincia
26	Can change provincia	7	change_provincia
27	Can delete provincia	7	delete_provincia
28	Can view provincia	7	view_provincia
29	Can add tipo_ documento	8	add_tipo_documento
30	Can change tipo_ documento	8	change_tipo_documento
31	Can delete tipo_ documento	8	delete_tipo_documento
32	Can view tipo_ documento	8	view_tipo_documento
33	Can add comprobante	9	add_comprobante
34	Can change comprobante	9	change_comprobante
35	Can delete comprobante	9	delete_comprobante
36	Can view comprobante	9	view_comprobante
37	Can add codigo_ postal	10	add_codigo_postal
38	Can change codigo_ postal	10	change_codigo_postal
39	Can delete codigo_ postal	10	delete_codigo_postal
40	Can view codigo_ postal	10	view_codigo_postal
41	Can add empresa	11	add_empresa
42	Can change empresa	11	change_empresa
43	Can delete empresa	11	delete_empresa
44	Can view empresa	11	view_empresa
45	Can add log entry	12	add_logentry
46	Can change log entry	12	change_logentry
47	Can delete log entry	12	delete_logentry
48	Can view log entry	12	view_logentry
49	Can add session	13	add_session
50	Can change session	13	change_session
51	Can delete session	13	delete_session
52	Can view session	13	view_session
53	Can add auth token	14	add_authtoken
54	Can change auth token	14	change_authtoken
55	Can delete auth token	14	delete_authtoken
56	Can view auth token	14	view_authtoken
57	Can add agencia	15	add_agencia
58	Can change agencia	15	change_agencia
59	Can delete agencia	15	delete_agencia
60	Can view agencia	15	view_agencia
61	Can add comprobante_ pto venta	16	add_comprobante_ptoventa
62	Can change comprobante_ pto venta	16	change_comprobante_ptoventa
63	Can delete comprobante_ pto venta	16	delete_comprobante_ptoventa
64	Can view comprobante_ pto venta	16	view_comprobante_ptoventa
65	Can add zona	17	add_zona
66	Can change zona	17	change_zona
67	Can delete zona	17	delete_zona
68	Can view zona	17	view_zona
69	Can add tarifa	18	add_tarifa
70	Can change tarifa	18	change_tarifa
71	Can delete tarifa	18	delete_tarifa
72	Can view tarifa	18	view_tarifa
73	Can add cobrador	19	add_cobrador
74	Can change cobrador	19	change_cobrador
75	Can delete cobrador	19	delete_cobrador
76	Can view cobrador	19	view_cobrador
77	Can add profile	20	add_profile
78	Can change profile	20	change_profile
79	Can delete profile	20	delete_profile
80	Can view profile	20	view_profile
81	Can add notificacion	21	add_notificacion
82	Can change notificacion	21	change_notificacion
83	Can delete notificacion	21	delete_notificacion
84	Can view notificacion	21	view_notificacion
85	Can add cliente	22	add_cliente
86	Can change cliente	22	change_cliente
87	Can delete cliente	22	delete_cliente
88	Can view cliente	22	view_cliente
89	Can add clientes_ agencia	23	add_clientes_agencia
90	Can change clientes_ agencia	23	change_clientes_agencia
91	Can delete clientes_ agencia	23	delete_clientes_agencia
92	Can view clientes_ agencia	23	view_clientes_agencia
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$180000$dFVJQ6CvI4Yq$s1GxvcryPcM1JHwYIF+vhUq7zuD2D1wiLEVF30GHGgM=	2020-03-30 08:07:58.058987-03	t	mcosta	Mauricio	Costa	estudiosistemas@gmail.com	t	t	2020-03-30 08:07:19.198146-03
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: bases_alicuota_iva; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bases_alicuota_iva (id, nombre, tasa, "codigo_Afip") FROM stdin;
1	iva 21,00 %	21	0005
2	iva 10,50 %	10.5	0004
3	iva 27,00 %	27	0006
4	iva 5,00 %	5	0008
5	iva 2,5 %	2.5	0009
6	iva 0,00 %	0	0003
\.


--
-- Data for Name: bases_codigo_postal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bases_codigo_postal (codigo, localidad, provincia_id) FROM stdin;
7300	AZUL	B
\.


--
-- Data for Name: bases_comprobante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bases_comprobante (id, estado, fc, fm, "codigo_AFIP", descripcion, tipo_comprobante, es_sistema, uc_id, um_id) FROM stdin;
1	t	2020-03-30 08:20:05.192778-03	2020-03-30 08:20:05.192778-03	001	FACTURAS A	D	f	\N	\N
2	t	2020-03-30 08:20:15.512649-03	2020-03-30 08:20:15.512649-03	002	NOTAS DE DEBITO A	D	f	\N	\N
3	t	2020-03-30 08:20:27.633429-03	2020-03-30 08:20:27.633429-03	003	NOTAS DE CREDITO A	C	f	\N	\N
4	t	2020-03-30 08:20:42.624082-03	2020-03-30 08:20:42.624082-03	006	FACTURAS B	D	f	\N	\N
5	t	2020-03-30 08:20:54.019208-03	2020-03-30 08:20:54.019208-03	007	NOTAS DE DEBITO B	D	f	\N	\N
6	t	2020-03-30 08:21:05.459569-03	2020-03-30 08:21:05.459569-03	008	NOTAS DE CREDITO B	C	f	\N	\N
7	t	2020-03-30 08:21:15.505651-03	2020-03-30 08:21:15.505651-03	011	FACTURAS C	D	f	\N	\N
8	t	2020-03-30 08:21:24.724613-03	2020-03-30 08:21:24.724613-03	012	NOTAS DE DEBITO C	D	f	\N	\N
9	t	2020-03-30 08:21:34.61762-03	2020-03-30 08:21:34.61762-03	013	NOTAS DE CREDITO C	C	f	\N	\N
\.


--
-- Data for Name: bases_condicion_iva; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bases_condicion_iva (id, nombre, codigo_afip) FROM stdin;
1	RESPONSABLE INSCRIPTO	1
2	IVA RESPONSABLE NO INSCRIPTO	2
3	IVA NO RESPONSABLE	3
4	IVA SUJETO EXENTO	4
5	CONSUMIDOR FINAL	5
6	RESPONSABLE ONOTRIBUTO	6
7	SUJETO NO CATEGORIZADO	7
8	MONOTRIBUTISTA SOCIAL	13
\.


--
-- Data for Name: bases_empresa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bases_empresa (id, estado, fc, fm, nombre, domicilio, telefono, cuit, inicio_actividades, iibb, logo, codigo_postal_id, iva_id, uc_id, um_id) FROM stdin;
1	t	2020-03-30 08:12:55.254304-03	2020-03-30 08:12:55.254304-03	HERRERA CARLOS HUGO	AV. MITRE 242	02281 422800	2023438518	2000-03-30	20234385187	logo_pics/20181022_220224.jpg	7300	1	\N	\N
\.


--
-- Data for Name: bases_provincia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bases_provincia (codigo, nombre) FROM stdin;
B	BUENOS AIRES
\.


--
-- Data for Name: bases_tipo_documento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bases_tipo_documento (codigo, nombre) FROM stdin;
80	CUIT
86	CUIL
96	DNI
99	SIN IDENTIFICAR/VENTA GLOBAL DIARIA
\.


--
-- Data for Name: clientes_cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes_cliente (id, estado, fc, fm, nombre, nro_documento, domicilio, telefono, email, representante, codigo_postal_id, iva_id, tipo_documento_id, uc_id, um_id) FROM stdin;
\.


--
-- Data for Name: clientes_clientes_agencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes_clientes_agencia (id, estado, fc, fm, agencia_id, cliente_id, cobrador_id, tarifa_id, uc_id, um_id, zona_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2020-03-30 08:09:05.123906-03	B	BUENOS AIRES	1	[{"added": {}}]	7	1
2	2020-03-30 08:09:07.171491-03	7300	AZUL (BUENOS AIRES)	1	[{"added": {}}]	10	1
3	2020-03-30 08:11:55.44672-03	1	RESPONSABLE INSCRIPTO	1	[{"added": {}}]	6	1
4	2020-03-30 08:12:55.265268-03	1	HERRERA CARLOS HUGO	1	[{"added": {}}]	11	1
5	2020-03-30 08:13:44.124936-03	1	AZUL	1	[{"added": {}}]	15	1
6	2020-03-30 08:14:00.570812-03	1	mcosta	1	[{"added": {}}]	20	1
7	2020-03-30 08:15:38.033237-03	2	IVA RESPONSABLE NO INSCRIPTO	1	[{"added": {}}]	6	1
8	2020-03-30 08:15:46.88609-03	3	IVA NO RESPONSABLE	1	[{"added": {}}]	6	1
9	2020-03-30 08:16:04.20712-03	4	IVA SUJETO EXENTO	1	[{"added": {}}]	6	1
10	2020-03-30 08:16:13.213821-03	5	CONSUMIDOR FINAL	1	[{"added": {}}]	6	1
11	2020-03-30 08:16:22.236717-03	6	RESPONSABLE ONOTRIBUTO	1	[{"added": {}}]	6	1
12	2020-03-30 08:16:38.246126-03	7	SUJETO NO CATEGORIZADO	1	[{"added": {}}]	6	1
13	2020-03-30 08:16:45.480677-03	8	MONOTRIBUTISTA SOCIAL	1	[{"added": {}}]	6	1
14	2020-03-30 08:17:49.067994-03	1	iva 21,00 %	1	[{"added": {}}]	5	1
15	2020-03-30 08:18:01.482812-03	2	iva 10,50 %	1	[{"added": {}}]	5	1
16	2020-03-30 08:18:19.529183-03	3	iva 27,00 %	1	[{"added": {}}]	5	1
17	2020-03-30 08:18:37.442895-03	4	iva 5,00 %	1	[{"added": {}}]	5	1
18	2020-03-30 08:18:47.677862-03	5	iva 2,5 %	1	[{"added": {}}]	5	1
19	2020-03-30 08:18:58.061243-03	6	iva 0,00 %	1	[{"added": {}}]	5	1
20	2020-03-30 08:20:05.195784-03	1	FACTURAS A	1	[{"added": {}}]	9	1
21	2020-03-30 08:20:15.513645-03	2	NOTAS DE DEBITO A	1	[{"added": {}}]	9	1
22	2020-03-30 08:20:27.636422-03	3	NOTAS DE CREDITO A	1	[{"added": {}}]	9	1
23	2020-03-30 08:20:42.626078-03	4	FACTURAS B	1	[{"added": {}}]	9	1
24	2020-03-30 08:20:54.02117-03	5	NOTAS DE DEBITO B	1	[{"added": {}}]	9	1
25	2020-03-30 08:21:05.461538-03	6	NOTAS DE CREDITO B	1	[{"added": {}}]	9	1
26	2020-03-30 08:21:15.508683-03	7	FACTURAS C	1	[{"added": {}}]	9	1
27	2020-03-30 08:21:24.726634-03	8	NOTAS DE DEBITO C	1	[{"added": {}}]	9	1
28	2020-03-30 08:21:34.619617-03	9	NOTAS DE CREDITO C	1	[{"added": {}}]	9	1
29	2020-03-30 08:22:00.875947-03	80	CUIT	1	[{"added": {}}]	8	1
30	2020-03-30 08:22:07.181585-03	86	CUIL	1	[{"added": {}}]	8	1
31	2020-03-30 08:22:13.656537-03	96	DNI	1	[{"added": {}}]	8	1
32	2020-03-30 08:22:23.853559-03	99	SIN IDENTIFICAR/VENTA GLOBAL DIARIA	1	[{"added": {}}]	8	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	auth	permission
2	auth	group
3	auth	user
4	contenttypes	contenttype
5	bases	alicuota_iva
6	bases	condicion_iva
7	bases	provincia
8	bases	tipo_documento
9	bases	comprobante
10	bases	codigo_postal
11	bases	empresa
12	admin	logentry
13	sessions	session
14	knox	authtoken
15	agencias	agencia
16	agencias	comprobante_ptoventa
17	agencias	zona
18	agencias	tarifa
19	agencias	cobrador
20	accounts	profile
21	notificaciones	notificacion
22	clientes	cliente
23	clientes	clientes_agencia
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2020-03-30 08:00:19.63516-03
2	contenttypes	0002_remove_content_type_name	2020-03-30 08:00:19.670375-03
3	auth	0001_initial	2020-03-30 08:00:20.060004-03
4	auth	0002_alter_permission_name_max_length	2020-03-30 08:00:21.097288-03
5	auth	0003_alter_user_email_max_length	2020-03-30 08:00:21.108225-03
6	auth	0004_alter_user_username_opts	2020-03-30 08:00:21.116203-03
7	auth	0005_alter_user_last_login_null	2020-03-30 08:00:21.124181-03
8	auth	0006_require_contenttypes_0002	2020-03-30 08:00:21.126176-03
9	auth	0007_alter_validators_add_error_messages	2020-03-30 08:00:21.133249-03
10	auth	0008_alter_user_username_max_length	2020-03-30 08:00:21.186525-03
11	auth	0009_alter_user_last_name_max_length	2020-03-30 08:00:21.193562-03
12	auth	0010_alter_group_name_max_length	2020-03-30 08:00:21.201528-03
13	auth	0011_update_proxy_permissions	2020-03-30 08:00:21.208641-03
14	bases	0001_initial	2020-03-30 08:00:21.447253-03
15	bases	0002_auto_20200224_1408	2020-03-30 08:05:41.260226-03
16	bases	0003_auto_20200224_1421	2020-03-30 08:05:41.316371-03
17	bases	0004_empresa	2020-03-30 08:05:41.447908-03
18	bases	0005_auto_20200312_1243	2020-03-30 08:05:41.681668-03
19	bases	0006_condicion_iva_codigo_afip	2020-03-30 08:05:41.69912-03
20	agencias	0001_initial	2020-03-30 08:06:09.662558-03
21	accounts	0001_initial	2020-03-30 08:06:10.463644-03
22	accounts	0002_auto_20200301_1301	2020-03-30 08:06:10.646387-03
23	admin	0001_initial	2020-03-30 08:06:10.799708-03
24	admin	0002_logentry_remove_auto_add	2020-03-30 08:06:10.923283-03
25	admin	0003_logentry_add_action_flag_choices	2020-03-30 08:06:10.937218-03
26	agencias	0002_auto_20200227_1231	2020-03-30 08:06:10.968436-03
27	agencias	0003_cobrador_tarifa_zona	2020-03-30 08:06:11.161491-03
28	clientes	0001_initial	2020-03-30 08:06:11.823885-03
29	clientes	0002_auto_20200315_1508	2020-03-30 08:06:12.582502-03
30	clientes	0003_auto_20200316_1610	2020-03-30 08:06:13.079136-03
31	knox	0001_initial	2020-03-30 08:06:13.137537-03
32	knox	0002_auto_20150916_1425	2020-03-30 08:06:13.346419-03
33	knox	0003_auto_20150916_1526	2020-03-30 08:06:13.491597-03
34	knox	0004_authtoken_expires	2020-03-30 08:06:13.510521-03
35	knox	0005_authtoken_token_key	2020-03-30 08:06:13.530493-03
36	knox	0006_auto_20160818_0932	2020-03-30 08:06:13.665562-03
37	knox	0007_auto_20190111_0542	2020-03-30 08:06:13.688832-03
38	notificaciones	0001_initial	2020-03-30 08:06:13.749158-03
39	sessions	0001_initial	2020-03-30 08:06:13.951106-03
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
ddzb3nov46heshjr74ocu6hs69j5wjrb	ODUzZGM3YTAwMTQwZjc0Y2ViYTNiNjkzODk3NGM3MTA3OGYyZjFhODp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3YjlhNmIyNjY2YWI2ODU5ZDk4OWJjZTc1ZWZmYjY2OTBkYjU5NGNiIn0=	2020-04-13 08:07:58.059979-03
\.


--
-- Data for Name: knox_authtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knox_authtoken (digest, salt, created, user_id, expiry, token_key) FROM stdin;
7f1c81aefc05c7781e35c4db6559ccbb45abda5891191bcafd5c6c812fabda1587d8d57ca62b0f89985ff36bc0d36b46ca56f74676873b8d661b51830f6c1568	2dce25964ec5cafc	2020-03-30 08:07:28.172705-03	1	2020-03-30 18:07:28.171731-03	525e7079
\.


--
-- Data for Name: notificaciones_notificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones_notificacion (id, estado, fc, fm, asunto, mensaje, prioridad, leida, uc_id, um_id, user_destino_id) FROM stdin;
\.


--
-- Name: accounts_profile_agencias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_profile_agencias_id_seq', 1, true);


--
-- Name: agencias_agencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencias_agencia_id_seq', 1, true);


--
-- Name: agencias_agencia_localidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencias_agencia_localidades_id_seq', 1, true);


--
-- Name: agencias_cobrador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencias_cobrador_id_seq', 1, false);


--
-- Name: agencias_comprobante_ptoventa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencias_comprobante_ptoventa_id_seq', 1, false);


--
-- Name: agencias_tarifa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencias_tarifa_id_seq', 1, false);


--
-- Name: agencias_zona_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencias_zona_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 92, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: bases_alicuota_iva_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bases_alicuota_iva_id_seq', 6, true);


--
-- Name: bases_comprobante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bases_comprobante_id_seq', 9, true);


--
-- Name: bases_condicion_iva_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bases_condicion_iva_id_seq', 8, true);


--
-- Name: bases_empresa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bases_empresa_id_seq', 1, true);


--
-- Name: clientes_cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_cliente_id_seq', 1, false);


--
-- Name: clientes_clientes_agencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_clientes_agencia_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 32, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 23, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 39, true);


--
-- Name: notificaciones_notificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_notificacion_id_seq', 1, false);


--
-- Name: accounts_profile_agencias accounts_profile_agencias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_profile_agencias
    ADD CONSTRAINT accounts_profile_agencias_pkey PRIMARY KEY (id);


--
-- Name: accounts_profile_agencias accounts_profile_agencias_profile_id_agencia_id_855f0661_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_profile_agencias
    ADD CONSTRAINT accounts_profile_agencias_profile_id_agencia_id_855f0661_uniq UNIQUE (profile_id, agencia_id);


--
-- Name: accounts_profile accounts_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_profile
    ADD CONSTRAINT accounts_profile_pkey PRIMARY KEY (user_id);


--
-- Name: agencias_agencia_localidades agencias_agencia_localid_agencia_id_codigo_postal_810b3c1f_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia_localidades
    ADD CONSTRAINT agencias_agencia_localid_agencia_id_codigo_postal_810b3c1f_uniq UNIQUE (agencia_id, codigo_postal_id);


--
-- Name: agencias_agencia_localidades agencias_agencia_localidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia_localidades
    ADD CONSTRAINT agencias_agencia_localidades_pkey PRIMARY KEY (id);


--
-- Name: agencias_agencia agencias_agencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia
    ADD CONSTRAINT agencias_agencia_pkey PRIMARY KEY (id);


--
-- Name: agencias_cobrador agencias_cobrador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_cobrador
    ADD CONSTRAINT agencias_cobrador_pkey PRIMARY KEY (id);


--
-- Name: agencias_comprobante_ptoventa agencias_comprobante_pto_agencia_id_comprobante_i_bc0950f1_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_comprobante_ptoventa
    ADD CONSTRAINT agencias_comprobante_pto_agencia_id_comprobante_i_bc0950f1_uniq UNIQUE (agencia_id, comprobante_id, punto_venta);


--
-- Name: agencias_comprobante_ptoventa agencias_comprobante_ptoventa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_comprobante_ptoventa
    ADD CONSTRAINT agencias_comprobante_ptoventa_pkey PRIMARY KEY (id);


--
-- Name: agencias_tarifa agencias_tarifa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_tarifa
    ADD CONSTRAINT agencias_tarifa_pkey PRIMARY KEY (id);


--
-- Name: agencias_zona agencias_zona_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_zona
    ADD CONSTRAINT agencias_zona_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: bases_alicuota_iva bases_alicuota_iva_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_alicuota_iva
    ADD CONSTRAINT bases_alicuota_iva_pkey PRIMARY KEY (id);


--
-- Name: bases_codigo_postal bases_codigo_postal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_codigo_postal
    ADD CONSTRAINT bases_codigo_postal_pkey PRIMARY KEY (codigo);


--
-- Name: bases_comprobante bases_comprobante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_comprobante
    ADD CONSTRAINT bases_comprobante_pkey PRIMARY KEY (id);


--
-- Name: bases_condicion_iva bases_condicion_iva_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_condicion_iva
    ADD CONSTRAINT bases_condicion_iva_pkey PRIMARY KEY (id);


--
-- Name: bases_empresa bases_empresa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_empresa
    ADD CONSTRAINT bases_empresa_pkey PRIMARY KEY (id);


--
-- Name: bases_provincia bases_provincia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_provincia
    ADD CONSTRAINT bases_provincia_pkey PRIMARY KEY (codigo);


--
-- Name: bases_tipo_documento bases_tipo_documento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_tipo_documento
    ADD CONSTRAINT bases_tipo_documento_pkey PRIMARY KEY (codigo);


--
-- Name: clientes_cliente clientes_cliente_nro_documento_8c78a205_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente
    ADD CONSTRAINT clientes_cliente_nro_documento_8c78a205_uniq UNIQUE (nro_documento);


--
-- Name: clientes_cliente clientes_cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente
    ADD CONSTRAINT clientes_cliente_pkey PRIMARY KEY (id);


--
-- Name: clientes_clientes_agencia clientes_clientes_agencia_agencia_id_cliente_id_e6f1cc73_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_agencia_agencia_id_cliente_id_e6f1cc73_uniq UNIQUE (agencia_id, cliente_id);


--
-- Name: clientes_clientes_agencia clientes_clientes_agencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_agencia_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: knox_authtoken knox_authtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knox_authtoken
    ADD CONSTRAINT knox_authtoken_pkey PRIMARY KEY (digest);


--
-- Name: knox_authtoken knox_authtoken_salt_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knox_authtoken
    ADD CONSTRAINT knox_authtoken_salt_key UNIQUE (salt);


--
-- Name: notificaciones_notificacion notificaciones_notificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_notificacion
    ADD CONSTRAINT notificaciones_notificacion_pkey PRIMARY KEY (id);


--
-- Name: accounts_profile_agencias_agencia_id_12afd2ab; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_profile_agencias_agencia_id_12afd2ab ON public.accounts_profile_agencias USING btree (agencia_id);


--
-- Name: accounts_profile_agencias_profile_id_b0f308f2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_profile_agencias_profile_id_b0f308f2 ON public.accounts_profile_agencias USING btree (profile_id);


--
-- Name: agencias_agencia_codigo_postal_id_842a425b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_codigo_postal_id_842a425b ON public.agencias_agencia USING btree (codigo_postal_id);


--
-- Name: agencias_agencia_codigo_postal_id_842a425b_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_codigo_postal_id_842a425b_like ON public.agencias_agencia USING btree (codigo_postal_id varchar_pattern_ops);


--
-- Name: agencias_agencia_empresa_id_84870afd; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_empresa_id_84870afd ON public.agencias_agencia USING btree (empresa_id);


--
-- Name: agencias_agencia_localidades_agencia_id_6c3dc0d0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_localidades_agencia_id_6c3dc0d0 ON public.agencias_agencia_localidades USING btree (agencia_id);


--
-- Name: agencias_agencia_localidades_codigo_postal_id_d738f797; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_localidades_codigo_postal_id_d738f797 ON public.agencias_agencia_localidades USING btree (codigo_postal_id);


--
-- Name: agencias_agencia_localidades_codigo_postal_id_d738f797_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_localidades_codigo_postal_id_d738f797_like ON public.agencias_agencia_localidades USING btree (codigo_postal_id varchar_pattern_ops);


--
-- Name: agencias_agencia_uc_id_c4bf47b1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_uc_id_c4bf47b1 ON public.agencias_agencia USING btree (uc_id);


--
-- Name: agencias_agencia_um_id_77febda2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_agencia_um_id_77febda2 ON public.agencias_agencia USING btree (um_id);


--
-- Name: agencias_cobrador_agencia_id_082c16ac; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_cobrador_agencia_id_082c16ac ON public.agencias_cobrador USING btree (agencia_id);


--
-- Name: agencias_cobrador_uc_id_22d9d5c6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_cobrador_uc_id_22d9d5c6 ON public.agencias_cobrador USING btree (uc_id);


--
-- Name: agencias_cobrador_um_id_8979cdc3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_cobrador_um_id_8979cdc3 ON public.agencias_cobrador USING btree (um_id);


--
-- Name: agencias_comprobante_ptoventa_agencia_id_a3f2ffe2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_comprobante_ptoventa_agencia_id_a3f2ffe2 ON public.agencias_comprobante_ptoventa USING btree (agencia_id);


--
-- Name: agencias_comprobante_ptoventa_comprobante_id_60eeb9e8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_comprobante_ptoventa_comprobante_id_60eeb9e8 ON public.agencias_comprobante_ptoventa USING btree (comprobante_id);


--
-- Name: agencias_comprobante_ptoventa_uc_id_e6092650; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_comprobante_ptoventa_uc_id_e6092650 ON public.agencias_comprobante_ptoventa USING btree (uc_id);


--
-- Name: agencias_comprobante_ptoventa_um_id_582dda3a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_comprobante_ptoventa_um_id_582dda3a ON public.agencias_comprobante_ptoventa USING btree (um_id);


--
-- Name: agencias_tarifa_agencia_id_d29771b6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_tarifa_agencia_id_d29771b6 ON public.agencias_tarifa USING btree (agencia_id);


--
-- Name: agencias_tarifa_uc_id_41ae94d7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_tarifa_uc_id_41ae94d7 ON public.agencias_tarifa USING btree (uc_id);


--
-- Name: agencias_tarifa_um_id_96b3eafb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_tarifa_um_id_96b3eafb ON public.agencias_tarifa USING btree (um_id);


--
-- Name: agencias_zona_agencia_id_cab5d38d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_zona_agencia_id_cab5d38d ON public.agencias_zona USING btree (agencia_id);


--
-- Name: agencias_zona_uc_id_5ed53ff0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_zona_uc_id_5ed53ff0 ON public.agencias_zona USING btree (uc_id);


--
-- Name: agencias_zona_um_id_d5d04816; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX agencias_zona_um_id_d5d04816 ON public.agencias_zona USING btree (um_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: bases_codigo_postal_codigo_106008f2_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_codigo_postal_codigo_106008f2_like ON public.bases_codigo_postal USING btree (codigo varchar_pattern_ops);


--
-- Name: bases_codigo_postal_provincia_id_3de2ebc7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_codigo_postal_provincia_id_3de2ebc7 ON public.bases_codigo_postal USING btree (provincia_id);


--
-- Name: bases_codigo_postal_provincia_id_3de2ebc7_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_codigo_postal_provincia_id_3de2ebc7_like ON public.bases_codigo_postal USING btree (provincia_id varchar_pattern_ops);


--
-- Name: bases_comprobante_uc_id_0bedf68c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_comprobante_uc_id_0bedf68c ON public.bases_comprobante USING btree (uc_id);


--
-- Name: bases_comprobante_um_id_e8cf19ad; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_comprobante_um_id_e8cf19ad ON public.bases_comprobante USING btree (um_id);


--
-- Name: bases_empresa_codigo_postal_id_2d191d3f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_empresa_codigo_postal_id_2d191d3f ON public.bases_empresa USING btree (codigo_postal_id);


--
-- Name: bases_empresa_codigo_postal_id_2d191d3f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_empresa_codigo_postal_id_2d191d3f_like ON public.bases_empresa USING btree (codigo_postal_id varchar_pattern_ops);


--
-- Name: bases_empresa_iva_id_ca45fe9a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_empresa_iva_id_ca45fe9a ON public.bases_empresa USING btree (iva_id);


--
-- Name: bases_empresa_uc_id_c48cc8c8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_empresa_uc_id_c48cc8c8 ON public.bases_empresa USING btree (uc_id);


--
-- Name: bases_empresa_um_id_98d99ac7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_empresa_um_id_98d99ac7 ON public.bases_empresa USING btree (um_id);


--
-- Name: bases_provincia_codigo_93739cf6_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bases_provincia_codigo_93739cf6_like ON public.bases_provincia USING btree (codigo varchar_pattern_ops);


--
-- Name: clientes_cliente_codigo_postal_id_06e7951a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_cliente_codigo_postal_id_06e7951a ON public.clientes_cliente USING btree (codigo_postal_id);


--
-- Name: clientes_cliente_codigo_postal_id_06e7951a_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_cliente_codigo_postal_id_06e7951a_like ON public.clientes_cliente USING btree (codigo_postal_id varchar_pattern_ops);


--
-- Name: clientes_cliente_iva_id_dceaedee; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_cliente_iva_id_dceaedee ON public.clientes_cliente USING btree (iva_id);


--
-- Name: clientes_cliente_nro_documento_8c78a205_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_cliente_nro_documento_8c78a205_like ON public.clientes_cliente USING btree (nro_documento varchar_pattern_ops);


--
-- Name: clientes_cliente_tipo_documento_id_12510f95; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_cliente_tipo_documento_id_12510f95 ON public.clientes_cliente USING btree (tipo_documento_id);


--
-- Name: clientes_cliente_uc_id_a69ce1a2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_cliente_uc_id_a69ce1a2 ON public.clientes_cliente USING btree (uc_id);


--
-- Name: clientes_cliente_um_id_69f36f36; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_cliente_um_id_69f36f36 ON public.clientes_cliente USING btree (um_id);


--
-- Name: clientes_clientes_agencia_agencia_id_bd663541; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_clientes_agencia_agencia_id_bd663541 ON public.clientes_clientes_agencia USING btree (agencia_id);


--
-- Name: clientes_clientes_agencia_cliente_id_27e7ff17; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_clientes_agencia_cliente_id_27e7ff17 ON public.clientes_clientes_agencia USING btree (cliente_id);


--
-- Name: clientes_clientes_agencia_cobrador_id_cfc5b4cf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_clientes_agencia_cobrador_id_cfc5b4cf ON public.clientes_clientes_agencia USING btree (cobrador_id);


--
-- Name: clientes_clientes_agencia_tarifa_id_391cb460; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_clientes_agencia_tarifa_id_391cb460 ON public.clientes_clientes_agencia USING btree (tarifa_id);


--
-- Name: clientes_clientes_agencia_uc_id_bcc40a23; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_clientes_agencia_uc_id_bcc40a23 ON public.clientes_clientes_agencia USING btree (uc_id);


--
-- Name: clientes_clientes_agencia_um_id_f0b8915b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_clientes_agencia_um_id_f0b8915b ON public.clientes_clientes_agencia USING btree (um_id);


--
-- Name: clientes_clientes_agencia_zona_id_14d7129a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX clientes_clientes_agencia_zona_id_14d7129a ON public.clientes_clientes_agencia USING btree (zona_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: knox_authtoken_digest_188c7e77_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_digest_188c7e77_like ON public.knox_authtoken USING btree (digest varchar_pattern_ops);


--
-- Name: knox_authtoken_salt_3d9f48ac_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_salt_3d9f48ac_like ON public.knox_authtoken USING btree (salt varchar_pattern_ops);


--
-- Name: knox_authtoken_token_key_8f4f7d47; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_token_key_8f4f7d47 ON public.knox_authtoken USING btree (token_key);


--
-- Name: knox_authtoken_token_key_8f4f7d47_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_token_key_8f4f7d47_like ON public.knox_authtoken USING btree (token_key varchar_pattern_ops);


--
-- Name: knox_authtoken_user_id_e5a5d899; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_user_id_e5a5d899 ON public.knox_authtoken USING btree (user_id);


--
-- Name: notificaciones_notificacion_uc_id_3d033b8a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notificaciones_notificacion_uc_id_3d033b8a ON public.notificaciones_notificacion USING btree (uc_id);


--
-- Name: notificaciones_notificacion_um_id_e86c4c1d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notificaciones_notificacion_um_id_e86c4c1d ON public.notificaciones_notificacion USING btree (um_id);


--
-- Name: notificaciones_notificacion_user_destino_id_cf821fc0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notificaciones_notificacion_user_destino_id_cf821fc0 ON public.notificaciones_notificacion USING btree (user_destino_id);


--
-- Name: accounts_profile_agencias accounts_profile_age_agencia_id_12afd2ab_fk_agencias_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_profile_agencias
    ADD CONSTRAINT accounts_profile_age_agencia_id_12afd2ab_fk_agencias_ FOREIGN KEY (agencia_id) REFERENCES public.agencias_agencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_profile_agencias accounts_profile_age_profile_id_b0f308f2_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_profile_agencias
    ADD CONSTRAINT accounts_profile_age_profile_id_b0f308f2_fk_accounts_ FOREIGN KEY (profile_id) REFERENCES public.accounts_profile(user_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_profile accounts_profile_user_id_49a85d32_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_profile
    ADD CONSTRAINT accounts_profile_user_id_49a85d32_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_agencia agencias_agencia_codigo_postal_id_842a425b_fk_bases_cod; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia
    ADD CONSTRAINT agencias_agencia_codigo_postal_id_842a425b_fk_bases_cod FOREIGN KEY (codigo_postal_id) REFERENCES public.bases_codigo_postal(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_agencia agencias_agencia_empresa_id_84870afd_fk_bases_empresa_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia
    ADD CONSTRAINT agencias_agencia_empresa_id_84870afd_fk_bases_empresa_id FOREIGN KEY (empresa_id) REFERENCES public.bases_empresa(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_agencia_localidades agencias_agencia_loc_agencia_id_6c3dc0d0_fk_agencias_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia_localidades
    ADD CONSTRAINT agencias_agencia_loc_agencia_id_6c3dc0d0_fk_agencias_ FOREIGN KEY (agencia_id) REFERENCES public.agencias_agencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_agencia_localidades agencias_agencia_loc_codigo_postal_id_d738f797_fk_bases_cod; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia_localidades
    ADD CONSTRAINT agencias_agencia_loc_codigo_postal_id_d738f797_fk_bases_cod FOREIGN KEY (codigo_postal_id) REFERENCES public.bases_codigo_postal(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_agencia agencias_agencia_uc_id_c4bf47b1_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia
    ADD CONSTRAINT agencias_agencia_uc_id_c4bf47b1_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_agencia agencias_agencia_um_id_77febda2_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_agencia
    ADD CONSTRAINT agencias_agencia_um_id_77febda2_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_cobrador agencias_cobrador_agencia_id_082c16ac_fk_agencias_agencia_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_cobrador
    ADD CONSTRAINT agencias_cobrador_agencia_id_082c16ac_fk_agencias_agencia_id FOREIGN KEY (agencia_id) REFERENCES public.agencias_agencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_cobrador agencias_cobrador_uc_id_22d9d5c6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_cobrador
    ADD CONSTRAINT agencias_cobrador_uc_id_22d9d5c6_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_cobrador agencias_cobrador_um_id_8979cdc3_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_cobrador
    ADD CONSTRAINT agencias_cobrador_um_id_8979cdc3_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_comprobante_ptoventa agencias_comprobante_agencia_id_a3f2ffe2_fk_agencias_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_comprobante_ptoventa
    ADD CONSTRAINT agencias_comprobante_agencia_id_a3f2ffe2_fk_agencias_ FOREIGN KEY (agencia_id) REFERENCES public.agencias_agencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_comprobante_ptoventa agencias_comprobante_comprobante_id_60eeb9e8_fk_bases_com; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_comprobante_ptoventa
    ADD CONSTRAINT agencias_comprobante_comprobante_id_60eeb9e8_fk_bases_com FOREIGN KEY (comprobante_id) REFERENCES public.bases_comprobante(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_comprobante_ptoventa agencias_comprobante_ptoventa_uc_id_e6092650_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_comprobante_ptoventa
    ADD CONSTRAINT agencias_comprobante_ptoventa_uc_id_e6092650_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_comprobante_ptoventa agencias_comprobante_ptoventa_um_id_582dda3a_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_comprobante_ptoventa
    ADD CONSTRAINT agencias_comprobante_ptoventa_um_id_582dda3a_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_tarifa agencias_tarifa_agencia_id_d29771b6_fk_agencias_agencia_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_tarifa
    ADD CONSTRAINT agencias_tarifa_agencia_id_d29771b6_fk_agencias_agencia_id FOREIGN KEY (agencia_id) REFERENCES public.agencias_agencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_tarifa agencias_tarifa_uc_id_41ae94d7_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_tarifa
    ADD CONSTRAINT agencias_tarifa_uc_id_41ae94d7_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_tarifa agencias_tarifa_um_id_96b3eafb_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_tarifa
    ADD CONSTRAINT agencias_tarifa_um_id_96b3eafb_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_zona agencias_zona_agencia_id_cab5d38d_fk_agencias_agencia_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_zona
    ADD CONSTRAINT agencias_zona_agencia_id_cab5d38d_fk_agencias_agencia_id FOREIGN KEY (agencia_id) REFERENCES public.agencias_agencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_zona agencias_zona_uc_id_5ed53ff0_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_zona
    ADD CONSTRAINT agencias_zona_uc_id_5ed53ff0_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: agencias_zona agencias_zona_um_id_d5d04816_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencias_zona
    ADD CONSTRAINT agencias_zona_um_id_d5d04816_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bases_codigo_postal bases_codigo_postal_provincia_id_3de2ebc7_fk_bases_pro; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_codigo_postal
    ADD CONSTRAINT bases_codigo_postal_provincia_id_3de2ebc7_fk_bases_pro FOREIGN KEY (provincia_id) REFERENCES public.bases_provincia(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bases_comprobante bases_comprobante_uc_id_0bedf68c_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_comprobante
    ADD CONSTRAINT bases_comprobante_uc_id_0bedf68c_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bases_comprobante bases_comprobante_um_id_e8cf19ad_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_comprobante
    ADD CONSTRAINT bases_comprobante_um_id_e8cf19ad_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bases_empresa bases_empresa_codigo_postal_id_2d191d3f_fk_bases_cod; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_empresa
    ADD CONSTRAINT bases_empresa_codigo_postal_id_2d191d3f_fk_bases_cod FOREIGN KEY (codigo_postal_id) REFERENCES public.bases_codigo_postal(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bases_empresa bases_empresa_iva_id_ca45fe9a_fk_bases_condicion_iva_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_empresa
    ADD CONSTRAINT bases_empresa_iva_id_ca45fe9a_fk_bases_condicion_iva_id FOREIGN KEY (iva_id) REFERENCES public.bases_condicion_iva(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bases_empresa bases_empresa_uc_id_c48cc8c8_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_empresa
    ADD CONSTRAINT bases_empresa_uc_id_c48cc8c8_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bases_empresa bases_empresa_um_id_98d99ac7_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases_empresa
    ADD CONSTRAINT bases_empresa_um_id_98d99ac7_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_cliente clientes_cliente_codigo_postal_id_06e7951a_fk_bases_cod; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente
    ADD CONSTRAINT clientes_cliente_codigo_postal_id_06e7951a_fk_bases_cod FOREIGN KEY (codigo_postal_id) REFERENCES public.bases_codigo_postal(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_cliente clientes_cliente_iva_id_dceaedee_fk_bases_condicion_iva_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente
    ADD CONSTRAINT clientes_cliente_iva_id_dceaedee_fk_bases_condicion_iva_id FOREIGN KEY (iva_id) REFERENCES public.bases_condicion_iva(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_cliente clientes_cliente_tipo_documento_id_12510f95_fk_bases_tip; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente
    ADD CONSTRAINT clientes_cliente_tipo_documento_id_12510f95_fk_bases_tip FOREIGN KEY (tipo_documento_id) REFERENCES public.bases_tipo_documento(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_cliente clientes_cliente_uc_id_a69ce1a2_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente
    ADD CONSTRAINT clientes_cliente_uc_id_a69ce1a2_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_cliente clientes_cliente_um_id_69f36f36_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_cliente
    ADD CONSTRAINT clientes_cliente_um_id_69f36f36_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_clientes_agencia clientes_clientes_ag_agencia_id_bd663541_fk_agencias_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_ag_agencia_id_bd663541_fk_agencias_ FOREIGN KEY (agencia_id) REFERENCES public.agencias_agencia(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_clientes_agencia clientes_clientes_ag_cliente_id_27e7ff17_fk_clientes_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_ag_cliente_id_27e7ff17_fk_clientes_ FOREIGN KEY (cliente_id) REFERENCES public.clientes_cliente(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_clientes_agencia clientes_clientes_ag_cobrador_id_cfc5b4cf_fk_agencias_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_ag_cobrador_id_cfc5b4cf_fk_agencias_ FOREIGN KEY (cobrador_id) REFERENCES public.agencias_cobrador(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_clientes_agencia clientes_clientes_ag_tarifa_id_391cb460_fk_agencias_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_ag_tarifa_id_391cb460_fk_agencias_ FOREIGN KEY (tarifa_id) REFERENCES public.agencias_tarifa(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_clientes_agencia clientes_clientes_agencia_uc_id_bcc40a23_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_agencia_uc_id_bcc40a23_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_clientes_agencia clientes_clientes_agencia_um_id_f0b8915b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_agencia_um_id_f0b8915b_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: clientes_clientes_agencia clientes_clientes_agencia_zona_id_14d7129a_fk_agencias_zona_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes_clientes_agencia
    ADD CONSTRAINT clientes_clientes_agencia_zona_id_14d7129a_fk_agencias_zona_id FOREIGN KEY (zona_id) REFERENCES public.agencias_zona(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: knox_authtoken knox_authtoken_user_id_e5a5d899_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knox_authtoken
    ADD CONSTRAINT knox_authtoken_user_id_e5a5d899_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: notificaciones_notificacion notificaciones_notif_user_destino_id_cf821fc0_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_notificacion
    ADD CONSTRAINT notificaciones_notif_user_destino_id_cf821fc0_fk_auth_user FOREIGN KEY (user_destino_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: notificaciones_notificacion notificaciones_notificacion_uc_id_3d033b8a_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_notificacion
    ADD CONSTRAINT notificaciones_notificacion_uc_id_3d033b8a_fk_auth_user_id FOREIGN KEY (uc_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: notificaciones_notificacion notificaciones_notificacion_um_id_e86c4c1d_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_notificacion
    ADD CONSTRAINT notificaciones_notificacion_um_id_e86c4c1d_fk_auth_user_id FOREIGN KEY (um_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

