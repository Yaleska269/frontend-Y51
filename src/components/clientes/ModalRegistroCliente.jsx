import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroCliente = ({
    mostrarModal,
    setMostrarModal,
    nuevoCliente,
    manejarCambioInput,
    agregarCliente,
}) => {
    return (
        <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="primer_nombre">
                                <Form.Label>Primer Nombre *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="primer_nombre"
                                    value={nuevoCliente.primer_nombre}
                                    onChange={manejarCambioInput}
                                    maxLength={20}
                                    required
                                    autoFocus
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="segundo_nombre">
                                <Form.Label>Segundo Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="segundo_nombre"
                                    value={nuevoCliente.segundo_nombre}
                                    onChange={manejarCambioInput}
                                    maxLength={20}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="primer_apellido">
                                <Form.Label>Primer Apellido </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="primer_apellido"
                                    value={nuevoCliente.primer_apellido}
                                    onChange={manejarCambioInput}
                                    maxLength={20}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="segundo_apellido">
                                <Form.Label>Segundo Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="segundo_apellido"
                                    value={nuevoCliente.segundo_apellido}
                                    onChange={manejarCambioInput}
                                    maxLength={20}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="celular">
                                <Form.Label>Celular</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="celular"
                                    value={nuevoCliente.celular}
                                    onChange={manejarCambioInput}
                                    maxLength={8}
                                    placeholder="88888888"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="direccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    value={nuevoCliente.direccion}
                                    onChange={manejarCambioInput}
                                    maxLength={50}
                                    placeholder="Barrio Tamanes 2 C al Este"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="cedula">
                                <Form.Label>Cedula</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cedula"
                                    value={nuevoCliente.cedula}
                                    onChange={manejarCambioInput}
                                    maxLength={16}
                                    placeholder="1-111-1111-000c"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={agregarCliente}
                    disabled={
                        !nuevoCliente.primer_nombre.trim() || 
                        !nuevoCliente.segundo_nombre.trim() ||
                        !nuevoCliente.primer_apellido.trim() ||
                        !nuevoCliente.segundo_apellido.trim() ||
                        !nuevoCliente.celular.trim() ||
                        !nuevoCliente.direccion.trim() ||
                        !nuevoCliente.cedula
                    }
                >
                    Guardar Cliente
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroCliente;
