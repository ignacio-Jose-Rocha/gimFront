const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/activities';

const activitiesAPI = {
  async createActivity(activityData) {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData)
      });

      if (!response.ok) {
        throw new Error('Error creando actividad');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createActivity:', error);
      throw error;
    }
  },

  async getAllActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);

      if (!response.ok) {
        throw new Error('Error obteniendo actividades');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getAllActivities:', error);
      throw error;
    }
  },

  async getActivitiesByDay(day) {
    try {
      const response = await fetch(`${API_BASE_URL}/by-day/${day}`);

      if (!response.ok) {
        throw new Error('Error obteniendo actividades');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getActivitiesByDay:', error);
      throw error;
    }
  },

  async getActivitiesByInstructor(instructor) {
    try {
      const response = await fetch(`${API_BASE_URL}/by-instructor/${encodeURIComponent(instructor)}`);

      if (!response.ok) {
        throw new Error('Error obteniendo actividades');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getActivitiesByInstructor:', error);
      throw error;
    }
  },

  async getActivitiesByActivityName(activityName) {
    try {
      const response = await fetch(`${API_BASE_URL}/by-activity/${encodeURIComponent(activityName)}`);

      if (!response.ok) {
        throw new Error('Error obteniendo actividades');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getActivitiesByActivityName:', error);
      throw error;
    }
  },

  async getScheduleByDay(day) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/day/${day}`);

      if (!response.ok) {
        throw new Error('Error obteniendo horario');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getScheduleByDay:', error);
      throw error;
    }
  },

  async getWeeklySchedule() {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/weekly`);

      if (!response.ok) {
        throw new Error('Error obteniendo horario semanal');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getWeeklySchedule:', error);
      throw error;
    }
  },

  async getActivityById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error('Error obteniendo actividad');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getActivityById:', error);
      throw error;
    }
  },

  async updateActivity(id, activityData) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData)
      });

      if (!response.ok) {
        throw new Error('Error actualizando actividad');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en updateActivity:', error);
      throw error;
    }
  },

  async deleteActivity(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error eliminando actividad');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en deleteActivity:', error);
      throw error;
    }
  }
};

export default activitiesAPI;
