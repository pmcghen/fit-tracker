-- Custom SQL migration file, put your code below! --
CREATE OR REPLACE FUNCTION insert_user_information()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_information (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_insert
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION insert_user_information();
