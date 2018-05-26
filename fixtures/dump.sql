--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.9
-- Dumped by pg_dump version 10.4 (Ubuntu 10.4-2.pgdg16.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS selectel_tickets;
--
-- Name: selectel_tickets; Type: DATABASE; Schema: -; Owner: selectel
--

CREATE DATABASE selectel_tickets WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'ru_RU.UTF-8' LC_CTYPE = 'ru_RU.UTF-8';


ALTER DATABASE selectel_tickets OWNER TO selectel;

\connect selectel_tickets

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: selectel
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    ticket_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    email character varying(255),
    message text
);


ALTER TABLE public.comments OWNER TO selectel;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: selectel
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO selectel;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: selectel
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: selectel
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    subject character varying(255),
    message text,
    email character varying(255),
    state integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.tickets OWNER TO selectel;

--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: selectel
--

CREATE SEQUENCE public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_id_seq OWNER TO selectel;

--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: selectel
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: selectel
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: selectel
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: selectel
--

COPY public.comments (id, ticket_id, created_at, email, message) FROM stdin;
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: selectel
--

COPY public.tickets (id, created_at, updated_at, subject, message, email, state) FROM stdin;
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: selectel
--

SELECT pg_catalog.setval('public.comments_id_seq', 566, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: selectel
--

SELECT pg_catalog.setval('public.tickets_id_seq', 99, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: selectel
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: selectel
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: comments comments_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: selectel
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

