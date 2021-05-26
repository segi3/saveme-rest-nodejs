
# account

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