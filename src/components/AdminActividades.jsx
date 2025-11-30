import { useState, useEffect } from 'react';
import activitiesAPI from '../utils/activitiesAPI';
import './AdminActividades.css';

const AdminActividades = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    activity_name: '',
    day: 'Lunes',
    start_time: '07:00',
    end_time: '08:00',
    duration_hours: 1,
    instructor: '',
    description: '',
    capacity: 20,
    level: 'Todos'
  });

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const levels = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
  const activities_list = ['Yoga', 'Spinning', 'Funcional', 'Boxeo', 'Jiu Jitsu', 'Karate', 'Sala de Musculación'];

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const response = await activitiesAPI.getAllActivities();
      setActivities(response.data || []);
      setError(null);
    } catch (err) {
      setError('Error cargando actividades');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration_hours' || name === 'capacity' ? parseFloat(value) : value
    }));
  };

  const calculateDuration = () => {
    const [startHour, startMin] = formData.start_time.split(':').map(Number);
    const [endHour, endMin] = formData.end_time.split(':').map(Number);
    const startTotalMin = startHour * 60 + startMin;
    const endTotalMin = endHour * 60 + endMin;
    const durationMin = endTotalMin - startTotalMin;
    const hours = durationMin / 60;
    setFormData(prev => ({
      ...prev,
      duration_hours: parseFloat(hours.toFixed(1))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await activitiesAPI.updateActivity(editingId, formData);
      } else {
        await activitiesAPI.createActivity(formData);
      }
      await loadActivities();
      resetForm();
      setError(null);
    } catch (err) {
      setError('Error guardando actividad');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity) => {
    setFormData(activity);
    setEditingId(activity.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      try {
        setLoading(true);
        await activitiesAPI.deleteActivity(id);
        await loadActivities();
        setError(null);
      } catch (err) {
        setError('Error eliminando actividad');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      activity_name: '',
      day: 'Lunes',
      start_time: '07:00',
      end_time: '08:00',
      duration_hours: 1,
      instructor: '',
      description: '',
      capacity: 20,
      level: 'Todos'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.day]) {
      acc[activity.day] = [];
    }
    acc[activity.day].push(activity);
    return acc;
  }, {});

  return (
    <div className="admin-actividades">
      <div className="admin-header">
        <h1>Administrar Actividades</h1>
        <button 
          className="btn-add" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Nueva Actividad'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form className="activity-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Actividad</label>
            <select 
              name="activity_name" 
              value={formData.activity_name}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar actividad</option>
              {activities_list.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Día</label>
            <select 
              name="day" 
              value={formData.day}
              onChange={handleInputChange}
              required
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Hora Inicio</label>
            <input 
              type="time" 
              name="start_time" 
              value={formData.start_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora Fin</label>
            <input 
              type="time" 
              name="end_time" 
              value={formData.end_time}
              onChange={handleInputChange}
              onBlur={calculateDuration}
              required
            />
          </div>

          <div className="form-group">
            <label>Duración (horas)</label>
            <input 
              type="number" 
              name="duration_hours" 
              value={formData.duration_hours}
              onChange={handleInputChange}
              step="0.5"
              min="0.5"
              required
            />
          </div>

          <div className="form-group">
            <label>Profesor</label>
            <input 
              type="text" 
              name="instructor" 
              value={formData.instructor}
              onChange={handleInputChange}
              placeholder="Nombre del profesor"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descripción de la actividad"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Capacidad</label>
            <input 
              type="number" 
              name="capacity" 
              value={formData.capacity}
              onChange={handleInputChange}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Nivel</label>
            <select 
              name="level" 
              value={formData.level}
              onChange={handleInputChange}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      )}

      {loading && !showForm && <div className="loading">Cargando...</div>}

      <div className="activities-schedule">
        {days.map(day => (
          <div key={day} className="day-section">
            <h2>{day}</h2>
            {groupedActivities[day] && groupedActivities[day].length > 0 ? (
              <div className="activities-list">
                {groupedActivities[day].map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-info">
                      <h3>{activity.activity_name}</h3>
                      <p><strong>Profesor:</strong> {activity.instructor}</p>
                      <p><strong>Horario:</strong> {activity.start_time} - {activity.end_time}</p>
                      <p><strong>Duración:</strong> {activity.duration_hours}h</p>
                      <p><strong>Capacidad:</strong> {activity.capacity}</p>
                      <p><strong>Nivel:</strong> {activity.level}</p>
                      {activity.description && <p><strong>Descripción:</strong> {activity.description}</p>}
                    </div>
                    <div className="activity-actions">
                      <button 
                        className="btn-edit" 
                        onClick={() => handleEdit(activity)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(activity.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-activities">No hay actividades programadas</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminActividades;
