import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {

  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Obtener funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;
  
  //Effect que detecta si hay una tarea seleccionada
  useEffect(()=> {
      if (tareaseleccionada !== null) {
         guardarTarea(tareaseleccionada)
      } else {
          guardarTarea({
              nombre: ''
          })
     }
  }, [tareaseleccionada])

  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Extraer nombre del proyecto
  const { nombre } = tarea;

  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  //Leer valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
      if (nombre.trim() === '') {
          validarTarea()
          return
      }

    //Si es edicion o nueva tarea
      if (tareaseleccionada === null) {
        //Agregar nueva tarea al state de tarea
        tarea.proyecto = proyectoActual._id;
        agregarTarea(tarea);
      } else {
          actualizarTarea(tarea)
          limpiarTarea()
      }    

      //Obtener y filtrar las tareas del proyecto actual
      obtenerTareas(proyectoActual.id)

    //Reiniciar form
      guardarTarea({
          nombre: ''
      })
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
}
 
export default FormTarea;