CREATE DATABASE eco_commute;
GO

USE eco_commute;
GO

CREATE TABLE roles (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE distritos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    activo BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    rol_id INT NOT NULL,
    distrito_id INT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    foto_url VARCHAR(500) NULL,
    puntos_totales INT NOT NULL DEFAULT 0,
    co2_total_ahorrado_kg DECIMAL(12,4) NOT NULL DEFAULT 0,
    fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    activo BIT NOT NULL DEFAULT 1,
    CONSTRAINT fk_usuarios_roles FOREIGN KEY (rol_id) REFERENCES roles(id),
    CONSTRAINT fk_usuarios_distritos FOREIGN KEY (distrito_id) REFERENCES distritos(id)
);
GO

CREATE TABLE medios_transporte (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    factor_co2_kg_km DECIMAL(10,4) NOT NULL,
    puntos_por_km INT NOT NULL,
    activo BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE viajes (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    medio_transporte_id INT NOT NULL,
    distrito_origen_id INT NULL,
    distrito_destino_id INT NULL,
    direccion_inicio VARCHAR(255) NULL,
    direccion_fin VARCHAR(255) NULL,
    distancia_km DECIMAL(10,2) NOT NULL,
    tiempo_minutos INT NOT NULL,
    co2_ahorrado_kg DECIMAL(10,4) NOT NULL,
    puntos_ganados INT NOT NULL,
    latitud_inicio DECIMAL(10,8) NULL,
    longitud_inicio DECIMAL(11,8) NULL,
    latitud_fin DECIMAL(10,8) NULL,
    longitud_fin DECIMAL(11,8) NULL,
    fecha_viaje DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_viajes_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_viajes_medios FOREIGN KEY (medio_transporte_id) REFERENCES medios_transporte(id),
    CONSTRAINT fk_viajes_distrito_origen FOREIGN KEY (distrito_origen_id) REFERENCES distritos(id),
    CONSTRAINT fk_viajes_distrito_destino FOREIGN KEY (distrito_destino_id) REFERENCES distritos(id)
);
GO

CREATE TABLE transacciones_puntos (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    viaje_id INT NULL,
    tipo VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    descripcion VARCHAR(255) NULL,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT chk_transacciones_tipo CHECK (tipo IN ('ganado', 'canjeado', 'ajuste')),
    CONSTRAINT chk_transacciones_cantidad CHECK (cantidad > 0),
    CONSTRAINT fk_transacciones_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_transacciones_viajes FOREIGN KEY (viaje_id) REFERENCES viajes(id)
);
GO

CREATE TABLE tiendas (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255) NULL,
    logo_url VARCHAR(500) NULL,
    descripcion VARCHAR(MAX) NULL,
    activa BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE recompensas (
    id INT PRIMARY KEY IDENTITY(1,1),
    tienda_id INT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX) NULL,
    puntos_requeridos INT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(500) NULL,
    activa BIT NOT NULL DEFAULT 1,
    CONSTRAINT chk_recompensas_puntos CHECK (puntos_requeridos > 0),
    CONSTRAINT chk_recompensas_stock CHECK (stock >= 0),
    CONSTRAINT fk_recompensas_tiendas FOREIGN KEY (tienda_id) REFERENCES tiendas(id)
);
GO

CREATE TABLE canjes (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    recompensa_id INT NOT NULL,
    puntos_canjeados INT NOT NULL,
    codigo_descuento VARCHAR(50) NOT NULL UNIQUE,
    fecha_canje DATETIME NOT NULL DEFAULT GETDATE(),
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    CONSTRAINT chk_canjes_estado CHECK (estado IN ('pendiente', 'usado', 'vencido', 'cancelado')),
    CONSTRAINT fk_canjes_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_canjes_recompensas FOREIGN KEY (recompensa_id) REFERENCES recompensas(id)
);
GO

CREATE TABLE logros (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NULL,
    puntos_bonus INT NOT NULL DEFAULT 0,
    condicion VARCHAR(255) NOT NULL,
    activo BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE usuarios_logros (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    logro_id INT NOT NULL,
    fecha_obtenido DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT uq_usuarios_logros UNIQUE (usuario_id, logro_id),
    CONSTRAINT fk_usuarios_logros_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_usuarios_logros_logros FOREIGN KEY (logro_id) REFERENCES logros(id)
);
GO

CREATE TABLE retos (
    id INT PRIMARY KEY IDENTITY(1,1),
    titulo VARCHAR(120) NOT NULL,
    descripcion VARCHAR(255) NULL,
    meta_co2_kg DECIMAL(10,2) NULL,
    meta_viajes INT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    puntos_bonus INT NOT NULL DEFAULT 0,
    activo BIT NOT NULL DEFAULT 1,
    CONSTRAINT chk_retos_fechas CHECK (fecha_fin >= fecha_inicio)
);
GO

CREATE TABLE usuarios_retos (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    reto_id INT NOT NULL,
    progreso_co2_kg DECIMAL(10,2) NOT NULL DEFAULT 0,
    progreso_viajes INT NOT NULL DEFAULT 0,
    completado BIT NOT NULL DEFAULT 0,
    fecha_union DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT uq_usuarios_retos UNIQUE (usuario_id, reto_id),
    CONSTRAINT fk_usuarios_retos_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_usuarios_retos_retos FOREIGN KEY (reto_id) REFERENCES retos(id)
);
GO
