import React, { useState } from "react"; 
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaClientes = ({
    clientes,
    cargando,
    abrirModalEdicion,
    abrirModalEliminacion,
    totalElementos,
    elementosPorPagina,
    paginaActual,
    establecerPaginaActual
}) => {
    const [orden, setOrden] = useState({ campo: "id_cliente", direccion: "asc" });

    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    const clientesOrdenados = [...clientes].sort((a, b) => {
        const valorA = a[orden.campo] ?? "";
        const valorB = b[orden.campo] ?? "";
        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
        }
        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.direccion === "asc" ? comparacion : -comparacion;
    });

    if (cargando) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
                            ID
                        </BotonOrden>
                        <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
                            Nombres
                        </BotonOrden>
                        <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
                            Apellidos
                        </BotonOrden>
                        <BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
                            Celular
                        </BotonOrden>
                        <BotonOrden campo="direccion" orden={orden} manejarOrden={manejarOrden}>
                            Dirección
                        </BotonOrden>
                        <BotonOrden campo="cedula" orden={orden} manejarOrden={manejarOrden}>
                            Cédula
                        </BotonOrden>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesOrdenados.map((cli) => (
                        <tr key={cli.id_cliente}>
                            <td>{cli.id_cliente}</td>
                            <td>{cli.primer_nombre} {cli.segundo_nombre || ''}</td>
                            <td>{cli.primer_apellido} {cli.segundo_apellido || ''}</td>
                            <td>{cli.celular || '-'}</td>
                            <td>{cli.direccion || '-'}</td>
                            <td>{cli.cedula || '-'}</td>
                            <td>
                                <Button
                                    variant="outline-warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => abrirModalEdicion(cli)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => abrirModalEliminacion(cli)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Paginacion
                elementosPorPagina={elementosPorPagina}
                totalElementos={totalElementos}
                paginaActual={paginaActual}
                establecerPaginaActual={establecerPaginaActual}
            />
        </>
    );
};

export default TablaClientes;
