import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
    mostrarModal,
    setMostrarModal,
    nuevoCliente,
    manejarCambioInput,
    agregarCliente,
}) => {
    return (
        <Modal backdrop="static"show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="primer_nombre">
                        <Form.Label>Primer Nombre del Cliente</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="primer_nombre"
                            value={nuevoCliente.primer_nombre}
                            onChange={manejarCambioInput}
                            placeholder="Ej: María"
                            maxLength={20}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="segundo_nombre">
                        <Form.Label>Segundo Nombre del Cliente</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="segundo_nombre"
                            value={nuevoCliente.segundo_nombre}
                            onChange={manejarCambioInput}
                            placeholder="Segundo nombre (máx. 20 caracteres)"
                            maxLength={20}
                        />
                    </Form.Group>

                <Form.Group className="mb-3" controlId="primer_apellido">
                        <Form.Label>Apellido 1 del Cliente</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="primer_apellido"
                            value={nuevoCliente.primer_apellido}
                            onChange={manejarCambioInput}
                            placeholder="Ej: González"
                            maxLength={20}
                        />
                    </Form.Group>

                <Form.Group className="mb-3" controlId="segundo_apellido">
                        <Form.Label>Apellido 2 del Cliente</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="segundo_apellido"
                            value={nuevoCliente.segundo_apellido}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Rodríguez"
                            maxLength={20}
                        />
                    </Form.Group>

                <Form.Group className="mb-3" controlId="celular">
                        <Form.Label>Celular del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="celular"
                            value={nuevoCliente.celular}
                            onChange={manejarCambioInput}
                            placeholder="Ej: 88248941"
                            maxLength={8}
                        />
                    </Form.Group>

                <Form.Group className="mb-3" controlId="direccion">
                        <Form.Label>Dirección del Cliente</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="direccion"
                            value={nuevoCliente.direccion}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Barrio Don Bosco, San José"
                            maxLength={100}
                        />
                    </Form.Group>
                
                <Form.Group className="mb-3" controlId="cedula">
                        <Form.Label>Cedula del Cliente</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="cedula"
                            value={nuevoCliente.cedula}
                            onChange={manejarCambioInput}
                            placeholder="Ej: 1-2345-6789"
                            maxLength={30}
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
                    onClick={agregarCliente}
                    disabled={!nuevoCliente.primer_nombre.trim()}
                >
                    Guardar Cliente
                </Button>
            </Modal.Footer>

        </Modal>
    );
};

export default ModalRegistroCliente;
