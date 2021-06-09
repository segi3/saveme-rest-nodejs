# Node js API server

B21CAP83

This is the backend server that served almost all backend logics of the applications. 

To run the server, several steps and files must be provided to run the server.

First fill out the env variables on a `.env` file.
```cmd
cp .env-sample .env
```
Required variables name are already included in `.env-sample` and all is obtainable from the google firebase console.

Second, is to get an application service account key that is also obtainable from the google firebase console. Once it is obtained, place the service account key on the root folder of the project with the name `serviceAccountKey.jon`.

Example of `serviceAccountKey.json`
```json
{
  "type": "service_account",
  "project_id": "b...",
  "private_key_id": "4de4f...",
  "private_key": "-----BEGIN PRIVATE KEY-----
    ...
  \n-----END PRIVATE KEY-----\n",
  "client_email": "firebase...",
  "client_id": "101155...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata..."
}

```

Lastly is to install all of node js depedencies by using 
```
npm install
```

And start the service using
```
node server
```


<br>

# API Documentations

## register akun

Penjelasan route: untuk register akun baru

tipe: `post`

host: `http://159.65.4.250:3000`

endpoint: `/api/account/v1/register`

full url: `http://159.65.4.250:3000/api/account/v1/register`

| field | deskripsi | contoh |
| --- | --- | --- |
| `_id` | id dari auth | `-` |
| `fullname` | nama pengguna | `rafi nizar` |
| `email` | email pengguna | `rafi@email.com` |
| `password` | password akun | `-` |
| `umur` | umur pengguna | `21` |
| `gender` | gender pengguna | `-` |
| `alamat` | alamat pengguna | `-` |
| `kota` | kota pegguna | `Serang` |
| `provinsi` | provinsi pengguna | `Banten` |
| `zipcode` | zipcode alamat | `42114` |
| `deviceRegistrationToken` | token FCM | `-` |

<br>

Hasil request:

```json
{
  "message": "Insert success.",
  "_id": // id punya user yang di registrasi
}
```

<br><br>

## fetch data akun

Penjelasan route: fetch data milik akun

tipe: `post`

host: `http://159.65.4.250:3000`

endpoint: `/api/account/v1/fetch`

full url: `http://159.65.4.250:3000/api/account/v1/fetch`

| field | deskripsi | contoh |
| --- | --- | --- |
| `_id` | id akun | `-` |

<br>

Hasil request:

```json
{
  "message": "fetch success.",
  "data": {
      // json object isi data punya akun
  }
}
```

<br><br>

## update location long lat

Penjelasan route: update long lat user

tipe: `post`

host: `http://159.65.4.250:3000`

endpoint: `/api/account/v1/updateLocation`

full url: `http://159.65.4.250:3000/api/account/v1/updateLocation`

| field | deskripsi | contoh |
| --- | --- | --- |
| `_id` | id akun | `-` |
| `long` | koordinat longitude | `3.14` |
| `lat` | koordinat latitude | `14.11` |

<br>

Hasil request:

```json
{
  "message": "location update success.",
  "location": {
      "long": // long dari request,
      "lat": // lat dari request
  }
}
```

<br><br>

## update registration token

Penjelasan route: update token fcm punya user

tipe: `post`

host: `http://159.65.4.250:3000`

endpoint: `/api/account/v1/updateRegistrationToken`

full url: `http://159.65.4.250:3000/api/account/v1/updateRegistrationToken`

| field | deskripsi | contoh |
| --- | --- | --- |
| `_id` | id akun | `-` |
| `deviceRegistrationToken` | token FCM | `-` |

<br>

Hasil request:

```json
{
  "message": "registration token update success.",
  "new_token": // token dari request
}
```

<br><br>


# Ping
## ping

Penjelasan route: ping user lain di sekitar

tipe: `post`

host: `http://159.65.4.250:3000`

endpoint: `/api/account/v1/updateRegistrationToken`

full url: `http://159.65.4.250:3000/api/account/v1/updateRegistrationToken`

| field | deskripsi | contoh |
| --- | --- | --- |
| `_id` | id akun | `-` |
| `kejahatan` | jenis kejahatan yang dipilih si user | `-` |
| `long` | koordinat longitude | `3.14` |
| `lat` | koordinat latitude | `14.11` |
| `deviceRegistrationToken` | token FCM | `-` |

<br>

Hasil request:

```json
{
  "message": "registration token update success.",
  "new_token": // token dari request
}
```