create database softvet;

use softvet;

create table usuarios(
	id_usuario int primary key auto_increment,
    nombre_usuario varchar(100),
    contraseña varchar(100),
    id_rol int,
    foreign key (id_rol) references roles(id_rol)
);

create table roles(
	id_rol int primary key auto_increment,
    nombre_rol varchar(100)
);

create table puestos(
	id_puesto int primary key auto_increment,
    nombre_puesto varchar(100)
);

create table empleados(
	id_empleado int primary key auto_increment,
    nombre_empleado varchar(100),
    dni_empleado varchar(100),
    direccion_empleado varchar(100),
    telefono_empleado varchar(100),
    mail_empleado varchar (100),
    id_puesto int,
    foreign key (id_puesto) references puestos(id_puesto)
);

create table clientes(
	id_cliente int primary key auto_increment,
    dni_cliente int,
    direccion_cliente varchar(100),
    celular_cliente int,
    mail_cliente varchar(100)
);

create table turnos(
	id_turno int primary key auto_increment,
    fecha_hora varchar(100),
    motivo varchar(100),
    estado varchar(100),
    id_cliente int,
    id_mascota int,
    id_empleado int,
    foreign key (id_cliente) references clientes(id_cliente),
    foreign key (id_mascota) references mascotas(id_mascota),
	foreign key (id_empleado) references empleados(id_empleado)
);

create table mascotas(
	id_mascota int primary key auto_increment,
    edad_mascota int,
    sexo_mascota varchar(100),
    historia_clinica varchar(100),
    observaciones_mascota varchar(100),
    id_raza int,
    id_cliente int,
    foreign	key (id_raza) references razas(id_raza),
    foreign	key (id_cliente) references clientes(id_cliente)
);

create table especies(
	id_especie int primary key auto_increment,
    nombre_especie varchar(100)
);

create table razas(
	id_raza int primary key auto_increment,
    nombre_raza varchar(100),
    id_especie int,
    foreign key (id_especie) references especies(id_especie)
);

create table productos(
	id_producto int primary key auto_increment,
    nombre_producto varchar(100),
    codigo_producto varchar(100),
    precio_producto varchar (100),
    id_categoria int,
    id_especie int,
    foreign key (id_categoria) references categorias(id_categoria),
    foreign key (id_especie) references especies(id_especie)
);

create table categorias(
	id_categoria int primary key auto_increment,
    nombre_categoria varchar(100)
);

create table stock(
	id_stock int primary key auto_increment,
    cantidad int,
    fecha varchar(100),
    observaciones varchar(100),
    id_producto int,
    id_sucursal int,
    foreign key (id_producto) references productos(id_producto),
    foreign key (id_sucursal) references sucursales(id_sucursal)
);


create table sucursales(
	id_sucursal int primary key auto_increment,
    nombre_sucursal varchar(100),
    direccion_sucursal varchar(100),
    telefono_sucursal varchar(100)
);

create table facturacion(
	id_factura int primary key auto_increment,
    cantidad int,
    precio_unitario int,
    id_venta int,
    id_producto int,
    foreign key (id_venta) references ventas(id_venta),
    foreign key (id_producto) references productos(id_producto)
);

create table ventas(
	id_venta int primary key auto_increment,
    fecha varchar(100),
    total int,
    id_cliente int,
    id_empleado int,
    id_sucursal int,
    foreign key (id_cliente) references clientes(id_cliente),
    foreign key (id_empleado) references empleados(id_empleado),
    foreign key (id_sucursal) references sucursales(id_sucursal)
);

create table proveedores(
	id_proveedor int primary key auto_increment,
    nombre_proveedor varchar(100),
    direccion_proveedor varchar(100),
    telefono_proveedor varchar(100),
    mail_proveedor varchar(100)
);

CREATE TABLE Farmacias (
id_farmacia INT PRIMARY KEY AUTO_INCREMENT,
nombre_farmacia VARCHAR(100),
direccion_farmacia VARCHAR(100),
telefono_farmacia VARCHAR(15),
mail_farmacia VARCHAR(100)
);

CREATE TABLE  Farmacias_Productos (
id_farmacia_prod INT PRIMARY KEY AUTO_INCREMENT,
precio_compra VARCHAR(100),
fecha_actualizacion VARCHAR(100),
id_farmacia INT,
id_producto INT,
FOREIGN KEY (id_farmacia) REFERENCES Farmacias (id_farmacia),
FOREIGN KEY (id_producto) REFERENCES Productos (id_producto)
);

CREATE TABLE Compras_Farmacias (
id_compra_farmacia INT PRIMARY KEY AUTO_INCREMENT,
id_farmacia INT,
id_empleado INT,
fecha_compra_farm VARCHAR(10),
monto_total VARCHAR(20),
FOREIGN KEY (id_farmacia) REFERENCES Farmacias (id_farmacia),
FOREIGN KEY (id_empleado) REFERENCES Empleados (id_empleado)
);

CREATE TABLE Detalle_Compras_Farmacias (
id_detalle_compra INT PRIMARY KEY AUTO_INCREMENT,
id_compra INT,
id_producto INT,
cantidad VARCHAR(20),
precio_unitario VARCHAR(10),
FOREIGN KEY (id_compra) REFERENCES Compras_Farmacias (id_compra_farmacia),
FOREIGN KEY (id_producto) REFERENCES Productos (id_producto)
);


ALTER TABLE Productos MODIFY precio_producto DECIMAL(10,2);
ALTER TABLE Farmacias_Productos MODIFY precio_compra DECIMAL(10,2);
ALTER TABLE Detalle_Compras_Farmacias MODIFY precio_unitario DECIMAL(10,2);
ALTER TABLE Facturacion MODIFY precio_unitario_factura DECIMAL(10,2);