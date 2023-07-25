CREATE DATABASE todopern

CREATE TABLE todolist(
    id SERIAL PRIMARY KEY
    description VARCHAR(255)
    isEditing boolean NOT NULL
    isComplete boolean NOT NULL
    
)