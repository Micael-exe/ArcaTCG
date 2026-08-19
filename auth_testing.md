# Auth-Gated App Testing Playbook

Step 1: Create Test User & Session
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  user_id: userId,
  email: 'test.user.' + Date.now() + '@example.com',
  name: 'Test User',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
});
print('Session token: ' + sessionToken);
print('User ID: ' + userId);
"

Step 2: Test Backend API
curl -X GET "$BASE/api/auth/me" -H "Authorization: Bearer YOUR_SESSION_TOKEN"
curl -X GET "$BASE/api/cart" -H "Authorization: Bearer YOUR_SESSION_TOKEN"
curl -X POST "$BASE/api/cart/add" -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_SESSION_TOKEN" -d '{"product_id":"d1","quantity":1}'

Step 3: Browser Testing
Set cookie session_token then navigate to app.

Checklist:
- User doc has user_id (UUID)
- Sessions link to user_id
- Queries use {"_id": 0} projection
- Cookie httpOnly, secure, samesite=none
- session_id in URL fragment detected via useLocation().hash
