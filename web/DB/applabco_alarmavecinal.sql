-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 12-03-2020 a las 15:14:47
-- Versión del servidor: 10.3.22-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `applabco_alarmavecinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `id_alerta` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `id_grupo` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `id_usuario` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `asunto` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `mensaje` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `alertas`
--

INSERT INTO `alertas` (`id_alerta`, `id_grupo`, `id_usuario`, `asunto`, `mensaje`, `fecha`) VALUES
('27e256883c7e4960bf3424f924a4821g', '', '', 'fgdgrsgrd', '', '2020-03-11 00:00:00'),
('5ae565a3870740429bb1dd373f88b574', '525c1052ac52423dbc4e799d100c7b3c', '', 'Persona Extraña', '', '2020-03-12 01:09:03'),
('671785795a3e45d18706c2b902c08414', '4c5c7b53c80242eeb58a4c646774aa9a', '', 'Fuga de Gas', '', '2020-03-12 14:59:48'),
('cff30537d44746f4a3d34c300bd41cbd', '2fd1624662df4bc1910e7077f394056d', '', 'Persona Extraña', '', '2020-03-11 23:14:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avisos`
--

CREATE TABLE `avisos` (
  `id_aviso` varchar(32) NOT NULL,
  `id_grupo` varchar(32) NOT NULL,
  `id_usuario` varchar(32) NOT NULL,
  `asunto` varchar(50) NOT NULL,
  `mensaje` varchar(2000) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `avisos`
--

INSERT INTO `avisos` (`id_aviso`, `id_grupo`, `id_usuario`, `asunto`, `mensaje`, `fecha`) VALUES
('8eb16340f83d42328dcb8710328ce23c', '6de666cbb12347d481f9619da1ce6f91', '27e256883c7e4960bf3424f924a4821f', 'Junta', 'Mañana junta ', '2020-03-11 23:02:01'),
('bc93b2e0305344ab8e9f21fed7307694', '2fd1624662df4bc1910e7077f394056d', '27e256883c7e4960bf3424f924a4821f', 'Junta', 'Mañana junta chavos', '2020-03-11 23:13:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emergencias`
--

CREATE TABLE `emergencias` (
  `id_emergencia` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `id_usuario` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `id_grupo` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tipo` int(1) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `emergencias`
--

INSERT INTO `emergencias` (`id_emergencia`, `id_usuario`, `id_grupo`, `tipo`, `fecha`) VALUES
('10eac501707345b0aad32b91243c7c6c', '27e256883c7e4960bf3424f924a4821f', '6df349fbdf4345bb8c969e92c86de288', 1, '2020-03-04 00:46:49'),
('3f8aa0f47ac7452695c646514989271c', 'b54718b6b245498f9df3554582265fbb', 'dd17b4309ddc4ca794e9833ff296b3f3', 1, '2020-03-04 00:10:15'),
('669869889aa64a2cb4ab0a57d86dcc6b', '27e256883c7e4960bf3424f924a4821f', '6df349fbdf4345bb8c969e92c86de288', 1, '2020-03-04 00:34:45'),
('884b441330af4489bb4325b814ad607f', '771aa28237074f13b3201fa242ce4de9', '525c1052ac52423dbc4e799d100c7b3c', 1, '2020-03-12 01:09:19'),
('909f8fe7808f4ad5b94ea5b33ce555b8', '27e256883c7e4960bf3424f924a4821f', '6df349fbdf4345bb8c969e92c86de288', 1, '2020-03-04 00:58:27'),
('93d0464bcf2046f48f5e805bc306c6c9', 'ee192c26f4f3466d801b9210e433d03d', '813b6120652740169522d1b0cc132ce6', 1, '2020-03-03 20:58:43'),
('99b6b24ed7c44f73a90b9a1bf65013ed', '27e256883c7e4960bf3424f924a4821f', '1594c4e099614fc3ae90868b159ed747', 1, '2020-03-03 21:31:21'),
('9ad771b7513744edb37c1922ebe3961f', '27e256883c7e4960bf3424f924a4821f', 'b6777d48f5ee4c639cc09c2be666dbb1', 1, '2020-03-03 20:53:07'),
('e583993a7fc34250bee74bc21c816e2e', '27e256883c7e4960bf3424f924a4821f', 'c29762f4829b4f3bb32c07e7fb94f8fc', 1, '2020-03-05 14:59:54'),
('ef01067703444ec4a4db7a13dd1d9bc0', '27e256883c7e4960bf3424f924a4821f', '2fd1624662df4bc1910e7077f394056d', 1, '2020-03-11 23:14:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `id_grupo` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `id_usuario` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`id_grupo`, `id_usuario`, `nombre`, `descripcion`, `fecha`) VALUES
('2fd1624662df4bc1910e7077f394056d', '27e256883c7e4960bf3424f924a4821f', 'pa', '', '2020-03-11 23:13:05'),
('4c5c7b53c80242eeb58a4c646774aa9a', '27e256883c7e4960bf3424f924a4821f', 'Vecinos cerrada', '', '2020-03-12 14:59:39'),
('525c1052ac52423dbc4e799d100c7b3c', '42e07846bb6543199c29ffe6e674b61b', 'fam', '', '2020-03-12 01:08:02'),
('9b98ec56cc9743c98e952894cda5c0f2', '27e256883c7e4960bf3424f924a4821f', '', '', '2020-03-11 23:34:42'),
('f9fb0ad64ede4c97a943ad60513a0748', '27e256883c7e4960bf3424f924a4821f', 'p1', '', '2020-03-11 18:35:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prealertas`
--

CREATE TABLE `prealertas` (
  `id_alerta` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `id_grupo` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `id_usuario` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `asunto` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `mensaje` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `prealertas`
--

INSERT INTO `prealertas` (`id_alerta`, `id_grupo`, `id_usuario`, `asunto`, `mensaje`, `fecha`) VALUES
('01e256883c7e4960bf3424f924a4821f', '', '', 'Puerta Dañada', '', '2020-03-12 00:00:00'),
('02e256883c7e4960bf3424f924a4821f', '', '', 'Fuga de Gas', '', '2020-03-12 00:00:00'),
('03e256883c7e4960bf3424f924a4821f', '', '', 'Persona Vigilando', '', '2020-03-12 00:00:00'),
('04e256883c7e4960bf3424f924a4821f', '', '', 'Fuga de Agua', '', '2020-03-12 00:00:00'),
('06e256883c7e4960bf3424f924a4821f', '', '', 'Incendio cerca', '', '2020-03-12 00:00:00'),
('90c25c3b3cfc4c6ea4829618e85a9e96', '', '', 'Persona Extraña', '', '2020-03-10 18:53:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `nombres` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidos` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombres`, `apellidos`, `mail`, `pass`, `direccion`, `fecha`) VALUES
('27e256883c7e4960bf3424f924a4821f', 'Raul', 'Martinez', 'a', 'a', 'Casa 13 Cerrada de dolores norte', '2020-02-25 00:00:00'),
('281e01955c524f1e930206f59822527c', 'lu', 'lu', 'lu', 'lu', 'lu', '2020-03-11 23:26:16'),
('42e07846bb6543199c29ffe6e674b61b', 'Lourdes', 'Flores', 'mlourdesfg13@gmail.com', 'amor', 'casa 13', '2020-03-12 00:50:04'),
('771aa28237074f13b3201fa242ce4de9', 'Raul', 'Martinez', 'neskirbi@gmail.com', 'ramira', 'casa', '2020-03-12 01:02:54');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`id_alerta`);

--
-- Indices de la tabla `avisos`
--
ALTER TABLE `avisos`
  ADD PRIMARY KEY (`id_aviso`);

--
-- Indices de la tabla `emergencias`
--
ALTER TABLE `emergencias`
  ADD PRIMARY KEY (`id_emergencia`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD UNIQUE KEY `id_grupos` (`id_grupo`);

--
-- Indices de la tabla `prealertas`
--
ALTER TABLE `prealertas`
  ADD PRIMARY KEY (`id_alerta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
