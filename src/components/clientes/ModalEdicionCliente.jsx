import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalEdicionCliente = ({
    mostrar,
    setMostrar,
    clienteEditado,
    setClienteEditado,
    guardarEdicion,
}) => {

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setClienteEditado((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
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
                                    value={clienteEditado?.primer_nombre || ''}
                                    onChange={manejarCambio}
                                    maxLength={20}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="segundo_nombre">
                                <Form.Label>Segundo Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="segundo_nombre"
                                    value={clienteEditado?.segundo_nombre || ''}
                                    onChange={manejarCambio}
                                    maxLength={20}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="primer_apellido">
                                <Form.Label>Primer Apellido *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="primer_apellido"
                                    value={clienteEditado?.primer_apellido || ''}
                                    onChange={manejarCambio}
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
                                    value={clienteEditado?.segundo_apellido || ''}
                                    onChange={manejarCambio}
                                    maxLength={20}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="celular">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control
                            type="text"
                            name="celular"
                            value={clienteEditado?.celular || ''}
                            onChange={manejarCambio}
                            maxLength={8}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="direccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={clienteEditado?.direccion || ''}
                            onChange={manejarCambio}
                            maxLength={50}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cedula">
                        <Form.Label>Cédula</Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={clienteEditado?.cedula || ''}
                            onChange={manejarCambio}
                            maxLength={15}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrar(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={guardarEdicion}
                    disabled={
                        !clienteEditado?.primer_nombre?.trim() ||
                        !clienteEditado?.primer_apellido?.trim()
                    }
                >
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdicionCliente;
