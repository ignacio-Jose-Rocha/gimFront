import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '../config/api';

const Calendario = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    startTime: '',
    endTime: '',
    description: ''
  });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [detailedEvents, setDetailedEvents] = useState({});

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITIES}`);
        setEvents(response.data);

        // También obtener actividades detalladas para la fecha seleccionada
        const dateStr = formatDate(selectedDate);
        const detailedResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITIES_BY_DATE(dateStr)}`);
        setDetailedEvents(prev => ({
          ...prev,
          [dateStr]: detailedResponse.data
        }));
      } catch (err) {
        console.error('Error al obtener actividades:', err);
      }
    };

    fetchActivities();

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Efecto para cargar actividades detalladas cuando cambia la fecha seleccionada
  useEffect(() => {
    const fetchDetailedActivities = async () => {
      const dateStr = formatDate(selectedDate);
      if (!detailedEvents[dateStr]) {
        try {
          const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITIES_BY_DATE(dateStr)}`);
          setDetailedEvents(prev => ({
            ...prev,
            [dateStr]: response.data
          }));
        } catch (err) {
          console.error('Error al obtener actividades detalladas:', err);
        }
      }
    };

    fetchDetailedActivities();
  }, [selectedDate]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
  };



  const handleAddActivity = async (e) => {
    e.preventDefault();

    if (!newActivity.title || !newActivity.startTime || !newActivity.endTime) {
      setError('Título, hora de inicio y hora final son requeridos');
      return;
    }

    // Validar que la hora de inicio sea menor que la hora final
    if (newActivity.startTime >= newActivity.endTime) {
      setError('La hora de inicio debe ser menor que la hora final');
      return;
    }

    try {
      const dateStr = formatDate(selectedDate);
      const timeRange = `${newActivity.startTime} - ${newActivity.endTime}`;

      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITIES}`, {
        date: dateStr,
        title: newActivity.title,
        time: timeRange,
        description: newActivity.description
      }, {
        headers: getAuthHeaders()
      });

      // Actualizar eventos localmente
      const updatedEvents = { ...events };
      if (!updatedEvents[dateStr]) {
        updatedEvents[dateStr] = [];
      }
      updatedEvents[dateStr].push(`${newActivity.title} - ${timeRange}`);
      setEvents(updatedEvents);

      // Actualizar actividades detalladas
      const detailedResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITIES_BY_DATE(dateStr)}`);
      setDetailedEvents(prev => ({
        ...prev,
        [dateStr]: detailedResponse.data
      }));

      // Limpiar formulario
      setNewActivity({ title: '', startTime: '', endTime: '', description: '' });
      setShowAddForm(false);
      setError(null);

    } catch (err) {
      console.error('Error al agregar actividad:', err);
      setError('Error al agregar la actividad');
    }
  };

  const handleEditActivity = (activity) => {
    // Extraer horas de inicio y fin del formato "HH:MM - HH:MM"
    const timeParts = activity.time.split(' - ');
    const startTime = timeParts[0] || '';
    const endTime = timeParts[1] || '';

    setSelectedActivity(activity);
    setNewActivity({
      title: activity.title,
      startTime: startTime,
      endTime: endTime,
      description: activity.description || ''
    });
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleUpdateActivity = async (e) => {
    e.preventDefault();

    if (!newActivity.title || !newActivity.startTime || !newActivity.endTime) {
      setError('Título, hora de inicio y hora final son requeridos');
      return;
    }

    if (newActivity.startTime >= newActivity.endTime) {
      setError('La hora de inicio debe ser menor que la hora final');
      return;
    }

    try {
      const dateStr = formatDate(selectedDate);
      const timeRange = `${newActivity.startTime} - ${newActivity.endTime}`;

      const response = await axios.put(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITY_BY_ID(selectedActivity.id)}`, {
        date: dateStr,
        title: newActivity.title,
        time: timeRange,
        description: newActivity.description
      }, {
        headers: getAuthHeaders()
      });

      // Actualizar eventos localmente
      const updatedEvents = { ...events };
      if (updatedEvents[dateStr]) {
        const activityIndex = updatedEvents[dateStr].findIndex(event =>
          event.includes(selectedActivity.title) && event.includes(selectedActivity.time)
        );
        if (activityIndex !== -1) {
          updatedEvents[dateStr][activityIndex] = `${newActivity.title} - ${timeRange}`;
        }
      }
      setEvents(updatedEvents);

      // Actualizar actividades detalladas
      const detailedResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITIES_BY_DATE(dateStr)}`);
      setDetailedEvents(prev => ({
        ...prev,
        [dateStr]: detailedResponse.data
      }));

      // Limpiar formulario
      setNewActivity({ title: '', startTime: '', endTime: '', description: '' });
      setSelectedActivity(null);
      setIsEditing(false);
      setShowAddForm(false);
      setError(null);

    } catch (err) {
      console.error('Error al actualizar actividad:', err);
      setError('Error al actualizar la actividad');
    }
  };

  const handleDeleteActivity = async (activity) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar la actividad "${activity.title}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITY_BY_ID(activity.id)}`, {
        headers: getAuthHeaders()
      });

      const dateStr = formatDate(selectedDate);

      // Actualizar eventos localmente
      const updatedEvents = { ...events };
      if (updatedEvents[dateStr]) {
        updatedEvents[dateStr] = updatedEvents[dateStr].filter(event =>
          !event.includes(activity.title) || !event.includes(activity.time)
        );
        if (updatedEvents[dateStr].length === 0) {
          delete updatedEvents[dateStr];
        }
      }
      setEvents(updatedEvents);

      // Actualizar actividades detalladas
      const detailedResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ACTIVITIES_BY_DATE(dateStr)}`);
      setDetailedEvents(prev => ({
        ...prev,
        [dateStr]: detailedResponse.data
      }));

      setError(null);

    } catch (err) {
      console.error('Error al eliminar actividad:', err);
      setError('Error al eliminar la actividad');
    }
  };

  const handleCancelEdit = () => {
    setNewActivity({ title: '', startTime: '', endTime: '', description: '' });
    setSelectedActivity(null);
    setIsEditing(false);
    setShowAddForm(false);
    setError(null);
  };





  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events[dateStr] || [];
  };

  const getDetailedEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return detailedEvents[dateStr] || [];
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="event-indicator">
            <div className="event-dot"></div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calendario-container" id="calendario">
      <div className="calendario-header">
        <h2 className="calendario-title">
          <i className="fas fa-calendar-alt"></i>
          Calendario de Actividades
        </h2>
        <p className="calendario-subtitle">Planifica tu entrenamiento semanal</p>
      </div>

      <div className="calendario-content">
        <div className="calendar-section">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            className="custom-calendar"
            locale="es-ES"
          />
        </div>

        <div className="events-section">
          <h3 className="events-title">
            <i className="fas fa-dumbbell"></i>
            Actividades del {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h3>

          <div className="events-list">
            {getDetailedEventsForDate(selectedDate).length > 0 ? (
              getDetailedEventsForDate(selectedDate).map((activity, index) => (
                <div key={activity.id || index} className="event-item">
                  <div className="event-info">
                    <i className="fas fa-clock"></i>
                    <div className="event-details">
                      <span className="event-title">{activity.title}</span>
                      <span className="event-time">{activity.time}</span>
                      {activity.description && (
                        <span className="event-description">{activity.description}</span>
                      )}
                    </div>
                  </div>
                  {isLoggedIn && (
                    <div className="event-actions">
                      <button
                        onClick={() => handleEditActivity(activity)}
                        className="edit-button"
                        title="Editar actividad"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(activity)}
                        className="delete-button"
                        title="Eliminar actividad"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-events">
                <i className="fas fa-calendar-times"></i>
                <p>No hay actividades programadas para este día</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección de administración */}
      {isLoggedIn && (
        <div className="admin-section">
          <h3><i className="fas fa-cog"></i> Panel de Administración</h3>

          {/* Gestión de actividades */}
          <div className="activity-management">
            <h4><i className="fas fa-calendar-plus"></i> Gestionar Actividades</h4>
            <button
              onClick={() => {
                if (showAddForm && !isEditing) {
                  setShowAddForm(false);
                } else if (!showAddForm) {
                  setShowAddForm(true);
                  setIsEditing(false);
                  setSelectedActivity(null);
                  setNewActivity({ title: '', startTime: '', endTime: '', description: '' });
                }
              }}
              className="add-activity-button"
            >
              <i className="fas fa-plus"></i>
              {showAddForm && !isEditing ? 'Cancelar' : 'Agregar Actividad'}
            </button>

            {showAddForm && (
              <form onSubmit={isEditing ? handleUpdateActivity : handleAddActivity} className="add-activity-form">
                <div className="form-header">
                  <h5>
                    <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus'}`}></i>
                    {isEditing ? 'Editar Actividad' : 'Agregar Nueva Actividad'}
                  </h5>
                </div>
                <div className="form-group">
                  <label>Fecha seleccionada:</label>
                  <span className="selected-date">
                    {selectedDate.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="activity-title">Título de la actividad:</label>
                  <input
                    id="activity-title"
                    type="text"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    placeholder="Ej: Yoga, Spinning, Funcional..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-start-time">Hora de inicio:</label>
                  <input
                    id="activity-start-time"
                    type="time"
                    value={newActivity.startTime}
                    onChange={(e) => setNewActivity({ ...newActivity, startTime: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-end-time">Hora final:</label>
                  <input
                    id="activity-end-time"
                    type="time"
                    value={newActivity.endTime}
                    onChange={(e) => setNewActivity({ ...newActivity, endTime: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-description">Descripción (opcional):</label>
                  <textarea
                    id="activity-description"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    placeholder="Descripción adicional de la actividad..."
                    rows="3"
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit" className="save-button">
                    <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'}`}></i>
                    {isEditing ? 'Actualizar Actividad' : 'Guardar Actividad'}
                  </button>
                  <button
                    type="button"
                    onClick={isEditing ? handleCancelEdit : () => setShowAddForm(false)}
                    className="cancel-button"
                  >
                    <i className="fas fa-times"></i>
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Botón de logout */}
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}



      {error && (
        <div className="error-container">
          <i className="fas fa-exclamation-triangle"></i>
          <p className="error-text">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Calendario;
