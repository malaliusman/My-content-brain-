# My-content-brain-
CREATE TABLE ai_generations (  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,  user_id uuid REFERENCES auth.users(id),  content_type text,  tone text,  prompt text,  generated_text text,  created_at timestamp DEFAULT now() );
