host: `159.65.4.250:3000`

# auth

## register akun

Penjelasan route: untuk register akun baru

endpoint: `/api/auth/register`

| field | deskripsi | contoh |
| --- | --- | --- |
| `name` | nama pengguna | `rafi nizar` |
| `email` | email pengguna | `rafi@email.com` |
| `password` | password akun (sementara di hash di server) | `12345678` |
| `verification-image` | foto pengguna dengan ktp, pake base64 | `base64 byte` |
| `location` | array isi lang, lat | `[50, 25.3]` |

<br>

Hasil request:

```json
{
    "message": "Account succesfully registered."
}
```

## login akun

Penjelasan route: untuk login akun yang sudah terdaftar

endpoint: `/api/auth/login`

| field | deskripsi |
| --- | --- |
| `email` | email pengguna |
| `password` | password pengguna |

<br>

Hasil request berhasil:

```json
{
    "auth": true,
    "token": "eyJhbGciOiJ...", // string token
    "refresh_token": "eyJhbGciOiJ..." // string refresh token
}
```

**Auth token dipake untuk semua request selain login sama register**
token biasa umur 15 menit
refresh token umur engga expired

Hasil request gagal (401 token invalid):
```json
{
    "auth": false,
    "message": "Failed to authenticate token."
}
```

Hasil request gagal (500 trobel di server):
```json
{
    auth: false,
    "message": "Error on the server."
}
```

Hasil request gagal (404 user not found):
```json
{
    auth: false,
    "message": "No user found."
}
```

## refresh auth token

Penjelasan route: untuk dapetin access token baru pake refresh token

endpoint: `/api/auth/token`

| field | deskripsi |
| --- | --- |
| `_id` | id user, bisa di dapetin dari `/api/auth/v1/me` |
| `email` | email user |
| `refresh_token` | refresh token punya user |

<br>

Hasil request berhasil:

```json
{
    "token": "eyJhbGciOiJ..." // string token
}
```

## dapetin data user sendiri

Penjelasan route: untuk dapetin access token baru pake refresh token

endpoint: `/api/auth/me`

engga butuh body, cuma butuh header `x-access-token` pake value **access token**

Hasil request berhasil:

```json
{
    "_id": "608ebc562a8f5b4ef00edbff",
    "name": "Rafi Nizar Abiyyi",
    "email": "rafi17@email.com"
}
```