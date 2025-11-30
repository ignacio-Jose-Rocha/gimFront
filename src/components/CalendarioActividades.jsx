import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { supabase } from '../config/supabase';

import './CalendarioActividades.css';

const CalendarioActividades = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    checkAdmin();
    loadActivities();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      checkAdmin();
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('loginSuccess', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('loginSuccess', handleStorageChange);
    };
  }, []);

  const checkAdmin = () => {
    const token = localStorage.getItem('token');
    setIsAdmin(!!token);
  };

  const loadActivities = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('activities')
        .select('*');
      
      if (error) throw error;
      
      setActivities(data || []);
      
      const schedule = {};
      const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      
      days.forEach(day => {
        schedule[day] = (data || []).filter(activity => activity.day === day);
      });
      
      setWeeklySchedule(schedule);
      setError(null);
    } catch (err) {
      console.error('Error cargando actividades:', err);
      setError('Error de conexión con Supabase');
    } finally {
      setLoading(false);
    }
  };



  const getDayName = (date) => {
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dayNames[date.getDay()];
  };

  const getActivitiesForSelectedDay = () => {
    const dayName = getDayName(selectedDate);
    return weeklySchedule[dayName] || [];
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
        const { error } = await supabase
          .from('activities')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('activities')
          .insert([formData]);
        if (error) throw error;
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
        const { error } = await supabase
          .from('activities')
          .delete()
          .eq('id', id);
        if (error) throw error;
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



  const selectedDayActivities = getActivitiesForSelectedDay();

  return (
    <div id="calendario" className="calendario-actividades">
      <div className="calendario-header">
        <h2>Calendario de Actividades</h2>
        <p>Consulta el horario de clases y actividades</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="calendario-main">
        <div className="calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="es-ES"
            className="custom-calendar"
          />
        </div>

        <div className="activities-wrapper">
          <div className="selected-day-info">
            <h3>
              <i className="fas fa-calendar-day"></i>
              {selectedDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
          </div>

          <div className="activities-list">
            {selectedDayActivities.length > 0 ? (
              selectedDayActivities.map(activity => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-header">
                    <span className="activity-name">{activity.activity_name}</span>
                    <span className="activity-level">{activity.level}</span>
                  </div>
                  <div className="activity-details">
                    <div className="detail-row">
                      <i className="fas fa-clock"></i>
                      <span>{activity.start_time} - {activity.end_time}</span>
                    </div>
                    <div className="detail-row">
                      <i className="fas fa-user"></i>
                      <span>{activity.instructor}</span>
                    </div>
                    <div className="detail-row">
                      <i className="fas fa-hourglass-half"></i>
                      <span>{activity.duration_hours}h</span>
                    </div>
                    {activity.capacity && (
                      <div className="detail-row">
                        <i className="fas fa-users"></i>
                        <span>Capacidad: {activity.capacity}</span>
                      </div>
                    )}
                    {activity.description && (
                      <div className="detail-row description">
                        <i className="fas fa-info-circle"></i>
                        <span>{activity.description}</span>
                      </div>
                    )}
                  </div>
                  
                  {isAdmin && (
                    <div className="activity-actions">
                      <button 
                        className="btn-edit" 
                        onClick={() => handleEdit(activity)}
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(activity.id)}
                        title="Eliminar"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-activities">
                <i className="fas fa-calendar-times"></i>
                <p>No hay actividades programadas para este día</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="admin-panel">
          <div className="admin-header">
            <h3>
              <i className="fas fa-cog"></i>
              Panel de Administración
            </h3>
            <button 
              className="btn-toggle-form"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <>
                  <i className="fas fa-times"></i> Cancelar
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i> Nueva Actividad
                </>
              )}
            </button>
          </div>

          {showForm && (
            <form className="activity-form" onSubmit={handleSubmit}>
              <div className="form-grid">
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

                <div className="form-group full-width">
                  <label>Descripción</label>
                  <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descripción de la actividad"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          <div className="admin-activities">
            <h4>Todas las Actividades</h4>
            <div className="activities-by-day">
              {days.map(day => {
                const dayActivities = weeklySchedule[day] || [];
                return (
                  <div key={day} className="day-group">
                    <h5>{day}</h5>
                    {dayActivities.length > 0 ? (
                      <div className="day-activities">
                        {dayActivities.map(activity => (
                          <div key={activity.id} className="admin-activity-item">
                            <div className="admin-activity-info">
                              <span className="time">{activity.start_time}-{activity.end_time}</span>
                              <span className="name">{activity.activity_name}</span>
                              <span className="instructor">{activity.instructor}</span>
                            </div>
                            <div className="admin-activity-actions">
                              <button 
                                className="btn-small-edit"
                                onClick={() => handleEdit(activity)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn-small-delete"
                                onClick={() => handleDelete(activity.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-activities-day">Sin actividades</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioActividades;
