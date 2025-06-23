# 🏪 Service de Gestion des Clients - API

API NestJS pour la gestion des clients, authentification et sessions d'un système de restaurant.

## 🚀 Démarrage rapide

### 1. Installation
```bash
npm install
cp .env.example .env
```

### 2. Base de données
```bash
docker compose up -d
npx prisma migrate dev
```

### 3. Lancement
```bash
npm run start:dev
```

## 📡 API Endpoints

### 🔐 Authentification
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/auth/login` | Connexion | ❌ |
| POST | `/auth/logout` | Déconnexion | ✅ |
| POST | `/auth/logout-all` | Déconnecter toutes les sessions | ✅ |
| GET | `/auth/sessions` | Lister les sessions actives | ✅ |

### 👥 Clients
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/clients` | Créer un client | ❌ |
| GET | `/clients` | Lister tous les clients | ❌ |
| GET | `/clients/:id` | Détail d'un client | ❌ |
| DELETE | `/clients/:id` | Supprimer un client | ❌ |

## 🔑 Authentification

### Connexion
```bash
POST /auth/login
{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

**Réponse :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "client": { "id": "...", "email": "...", ... }
}
```

### Utilisation du token
```bash
Authorization: Bearer <access_token>
```

## 📝 Exemples

### Créer un client
```bash
POST /clients
{
  "email": "client@example.com",
  "password": "motdepasse123",
  "firstName": "Jean",
  "lastName": "Dupont",
  "phone": "+33123456789",
  "address": "123 rue de la Paix",
  "city": "Paris",
  "postalCode": "75001"
}
```

### Test avec curl
```bash
# Connexion
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jean.dupont@example.com","password":"motdepasse123"}'

# Créer un client
curl -X POST http://localhost:3001/clients \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

## 🌐 URLs importantes

- **API** : http://localhost:3001
- **Documentation Swagger** : http://localhost:3001/api
- **Base de données** : PostgreSQL sur le port 5432

## 🏗️ Rôles utilisateur

- `CLIENT` (par défaut)
- `CHEF`
- `LIVREUR` 
- `ADMIN`

## ⚠️ Notes importantes

- Les tokens JWT expirent après **24h**
- Les sessions sont stockées en base de données
- La déconnexion invalide immédiatement le token
- Validation automatique des emails et numéros de téléphone français
