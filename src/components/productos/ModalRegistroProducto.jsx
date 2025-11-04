import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProducto = ({
    mostrarModal,
    setMostrarModal,
    nuevoProducto,
    manejarCambioInput,
    agregarProducto,
}) => {
    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nombreProducto">
                        <Form.Label>Nombre del producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre_producto"
                            value={nuevoProducto.nombre_producto}
                            onChange={manejarCambioInput}
                            placeholder="Ingrese el producto"
                            maxLength={100}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descripcionProducto">
                        <Form.Label>Descripción del producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcion_producto"
                            value={nuevoProducto.descripcion_producto}
                            onChange={manejarCambioInput}
                            placeholder="Descripción opcional (máx. 100 caracteres)"
                            maxLength={100}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="idCategoria">
                        <Form.Label>Id Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            name="id_categoria"
                            value={nuevoProducto.id_categoria}
                            onChange={manejarCambioInput}
                            placeholder="ID (máx. 50 caracteres)"
                            maxLength={50}
                        />
                    </Form.Group>


                    
                    <Form.Group className="mb-3" controlId="precioUnitario">
                        <Form.Label>precio Unitario</Form.Label>
                        <Form.Control
                            type="text"
                            name="precio_unitario"
                            value={nuevoProducto.precio_unitario}
                            onChange={manejarCambioInput}
                            placeholder="Precio del producto"
                            maxLength={40}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="text"
                            name="stock "
                            value={nuevoProducto.precio_unitario}
                            onChange={manejarCambioInput}
                            placeholder=" stock "
                            maxLength={40}
                        />
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={agregarProducto}
                    disabled={!nuevoProducto.nombre_producto.trim()}
                >
                    Guardar Producto
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroProducto;
