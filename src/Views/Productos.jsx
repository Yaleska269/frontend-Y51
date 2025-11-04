import { useState, useEffect } from 'react';
import { Container, Row, Col, Button  } from 'react-bootstrap';
import TablaProductos from '../components/productos/TablaProductos';
import CuadroBusquedas from '../components/Busquedas/CuadroBusquedas';
import ModalRegistroProducto from '../components/productos/ModalRegistroProducto';


const Productos = () => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: ''
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoProducto(prev => ({ ...prev, [name]: value }));
    };

    const agregarProducto = async () => {
        if (!nuevoProducto.nombre_producto.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3000/api/registrarProducto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto)
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            // Limpiar y cerrar
            setNuevoProducto({ nombre_producto: '', descripcion_producto: '', id_categoria: '', precio_unitario: '', stock: '' });
            setMostrarModal(false);
            await obtenerProductos(); // Refresca la lista
        } catch (error) {
            console.error("Error al agregar un producto:", error);
            alert("No se pudo guardar el producto. Revisa la consola.");
        }
    };


    const obtenerProductos = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/productos');
            if (!respuesta.ok) {
                throw new Error('Error al obtener los productos');
            }
            const datos = await respuesta.json();
            setProductos(datos);
            setProductosFiltrados(datos);
            setCargando(false);

        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = productos.filter(
            (productos) =>
                productos.nombre_producto.toLowerCase().includes(texto) ||
                productos.descripcion_producto.toString().toLowerCase().includes(texto) ||
                productos.id_categoria.toString().toLowerCase().includes(texto) ||
                productos.precio_unitario.toString().toLowerCase().includes(texto) ||
                productos.stock.toString().toLowerCase().includes(texto)
        );

        setProductosFiltrados(filtrados);
    };


    useEffect(() => {
        obtenerProductos();
    }, []);


    return (
        <>
            <Container className="mt-4">

                <h4>Productos</h4>

                <Row>
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                </Row>

                <Col className="text-end">
                    <Button
                        variant="primary"
                        className="mt-3 mb-3 color-boton-registro"
                        onClick={() => setMostrarModal(true)}
                    >
                        + Nuevo Producto
                    </Button>
                </Col>

                <TablaProductos
                    productos={productosFiltrados}
                    cargando={cargando}
                />

                <ModalRegistroProducto
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoProducto={nuevoProducto}
                    manejarCambioInput={manejarCambioInput}
                    agregarProducto={agregarProducto}
                />

            </Container>
        </>
    );
}

export default Productos;
