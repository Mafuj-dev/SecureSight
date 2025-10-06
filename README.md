For removal of existing venv
Remove-Item -Recurse -Force .venv

For creation of vitual environment
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt


use two terminal to run

one for backend
cd .\backend\
uvicorn app.main:app --reload

another for frontend
cd .\frontend\
npm run dev
