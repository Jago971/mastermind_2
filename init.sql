USE mydatabase;

-- Create highscores table
CREATE TABLE IF NOT EXISTS highscores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);