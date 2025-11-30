CREATE TABLE IF NOT EXISTS activities (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  activity_name VARCHAR(255) NOT NULL,
  day VARCHAR(50) NOT NULL,
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5) NOT NULL,
  duration_hours DECIMAL(3,1) NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  description TEXT,
  capacity INTEGER,
  level VARCHAR(50) DEFAULT 'Todos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activities_day ON activities(day);
CREATE INDEX IF NOT EXISTS idx_activities_instructor ON activities(instructor);
CREATE INDEX IF NOT EXISTS idx_activities_activity_name ON activities(activity_name);
