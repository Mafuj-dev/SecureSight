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
npm install (for first time)
npm install firebase
npm install react-router-dom
npm install jspdf


cd .\frontend\
npm run dev
