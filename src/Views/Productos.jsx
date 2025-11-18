import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionproducto";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";


const Productos = () => {

    const [productos, setproductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

    const [productoEditado, setProductoEditado] = useState(null);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const obtenerProductos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/productos");
            if (!respuesta.ok) {
                throw new Error("Error al obtener los productos");
            }

            const datos = await respuesta.json();
            setproductos(datos);
            setProductosFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };


    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);
        const filtrados = productos.filter(
            (producto) =>
                producto.nombre_producto.toLowerCase().includes(texto) ||
                producto.descripcion_producto.toLowerCase().includes(texto) ||
                producto.id_categoria == texto ||
                producto.precio_unitario == texto ||
                producto.stock == texto
        );
        setProductosFiltrados(filtrados);
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    // Estado y métodos para registro de producto (modal de creación)
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        stock: "",
        imagen: "",
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prev) => ({ ...prev, [name]: value }));
    };

    //////////////////////PDF//////////////////////
    const generarPDFProductos = () => {
        const doc = new jsPDF();

        //Encabezado del PDF
        doc.setFillColor(28, 41, 51);
        doc.rect(0, 0, 220, 30, 'F');

        //Titulo centrado con texto blanco
        doc.setTextColor(255, 255, 255); //Color del titulo
        doc.setFontSize(28);
        doc.text("Lista de productos", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

        const columnas = ["ID", "Nombre", "Descripción", "Categoria", "Precio", "Stock"];
        const filas = productosFiltrados.map((productos) => [
            productos.id_producto,
            productos.nombre_producto,
            productos.descripcion_producto,
            productos.id_categoria,
            "C$" + productos.precio_unitario,
            productos.stock,
        ]);

        const totalPaginas = "{total_pages_count_string}";

        //Configuración de la tabla
        autoTable(doc, {
            head: [columnas],
            body: filas,
            startY: 40,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 2 },
            margin: { top: 20, left: 14, right: 14 },
            tableWidth: "auto",
            columnStyles: {
                0: { cellWidth: "auto" },
                1: { cellWidth: "auto" },
                2: { cellWidth: "auto" },
            },
            pageBreak: "auto",
            rowPageBreak: "auto",

            didDrawPage: function (data) {
                const alturaPagina = doc.internal.pageSize.getHeight();
                const anchoPagina = doc.internal.pageSize.getWidth();

                const numeroPagina = doc.internal.getNumberOfPages();

                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                const piePagina = `Página ${numeroPagina} de ${totalPaginas}`;
                doc.text(piePagina, anchoPagina / 2 + 15, alturaPagina - 10, { align: "center" });
            },
        });


        if (typeof doc.putTotalPages === "function") {
            doc.putTotalPages(totalPaginas);
        }

        //Guardar el PDF con un nombre
        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const anio = fecha.getFullYear();
        const nombreArchivo = "productos_" + dia + mes + anio + ".pdf";

        //Guardar el documento PDF
        doc.save(nombreArchivo);
    };

    const agregarProducto = async () => {
        if (!nuevoProducto.nombre_producto.trim()) return;
        try {
            const respuesta = await fetch("http://localhost:3000/api/registrarproducto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });
            if (!respuesta.ok) throw new Error("Error al guardar producto");
            // Limpiar y cerrar
            setNuevoProducto({
                nombre_producto: "",
                descripcion_producto: "",
                id_categoria: "",
                precio_unitario: "",
                stock: "",
                imagen: "",
            });
            setMostrarModal(false);
            await obtenerProductos();
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("No se pudo guardar el producto. Revisa la consola.");
        }
    };

    const abrirModalEdicion = (producto) => {
        setProductoEditado({ ...producto });
        setMostrarModalEdicion(true);
    };

    const guardarEdicion = async () => {
        if (!productoEditado.nombre_producto.trim()) return;
        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/actualizarproducto/${productoEditado.id_producto}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(productoEditado),
                }
            );
            if (!respuesta.ok) throw new Error("Error al actualizar producto");
            setMostrarModalEdicion(false);
            await obtenerProductos();
        } catch (error) {
            console.error("Error al editar producto:", error);
            alert("No se pudo actualizar el producto.");
        }
    };

    const abrirModalEliminacion = (producto) => {
        setProductoAEliminar(producto);
        setMostrarModalEliminar(true);
    };

    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/eliminarproducto/${productoAEliminar.id_producto}`,
                {
                    method: "DELETE",
                }
            );
            if (!respuesta.ok) throw new Error("Error al eliminar producto");
            setMostrarModalEliminar(false);
            setProductoAEliminar(null);
            await obtenerProductos();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("No se pudo eliminar el producto.");
        }
    };


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
                    <Col className="text-end">
                        <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
                            + Nuevo Producto
                        </Button>
                    </Col>
                </Row>

                <Col lg={3} md={4} sm={4} xs={5}>
                <Button
                    className="mb-3"
                    onClick={generarPDFProductos}
                    variant="secondary"
                    style={{ width: "100%" }}
                >
                    Generar reporte PDF
                </Button>
            </Col>

                <TablaProductos
                    productos={productosFiltrados}
                    cargando={cargando}
                    abrirModalEdicion={abrirModalEdicion}
                    abrirModalEliminacion={abrirModalEliminacion}
                />
            
                <ModalRegistroProducto
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoProducto={nuevoProducto}
                    manejarCambioInput={manejarCambioInput}
                    agregarProducto={agregarProducto}
                />

                <ModalEdicionProducto
                    mostrar={mostrarModalEdicion}
                    setMostrar={setMostrarModalEdicion}
                    productoEditado={productoEditado}
                    setProductoEditado={setProductoEditado}
                    guardarEdicion={guardarEdicion}
                />

                <ModalEliminacionProducto
                    mostrar={mostrarModalEliminar}
                    setMostrar={setMostrarModalEliminar}
                    producto={productoAEliminar}
                    confirmarEliminacion={confirmarEliminacion}
                />
            </Container>

            

        </>

    );
};

export default Productos;