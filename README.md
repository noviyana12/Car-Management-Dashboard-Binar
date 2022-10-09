# Car-Management-Dashboard-Binar
This is project for 5th challenge Binar Fullstack Web 1

Cara Membuka Project:
1. Buka XAMPP
2. Buat database "carbinar"
3. Ketikkan di terminal : nodemon server.js

Link ke masing-masing halaman:
1. Dashboard (halaman utama) = http://localhost:8080/
2. Create data = http://localhost:8080/add
3. Update data = http://localhost:8080/edit/:id (contohnya edit/1)
4. Hapus data = http://localhost:8080/delete/:id

Link untuk cek REST API di postman:
Untuk link menggunakan link yang sama dengan link ke masing-masing halaman, namun harus melakukan rekonstruksi kode sedikit dimana tiap fungsi di controller mereturn "res.send(data)" dan bukan halaman (res.redirect("/")). Contoh seperti di bawah, hapus komentarnya dan beri komentar pada return dibawah:

<img width="345" alt="Screenshot 2022-10-09 124836" src="https://user-images.githubusercontent.com/54648155/194740347-2a566259-74a4-46dc-a883-7979c398c2a2.png">

1. Create data = http://localhost:8080/add dengan method POST
<img width="651" alt="Screenshot 2022-10-09 125103" src="https://user-images.githubusercontent.com/54648155/194740433-e76b1e07-230f-46e0-8288-a98229c2fada.png">
2. Find All data = http://localhost:8080/ dengan method GET
<img width="658" alt="Screenshot 2022-10-09 130134" src="https://user-images.githubusercontent.com/54648155/194740801-93f5a5dc-4e1a-4cdf-a8d8-99e3e106eb32.png">
3. Update Data = http://localhost:8080/edit/:id (contohnya edit/1) dengan method PUT
<img width="640" alt="Screenshot 2022-10-09 130825" src="https://user-images.githubusercontent.com/54648155/194741023-acc7dd81-e14c-4ae7-913f-e07e2b071507.png">
4. Hapus data = http://localhost:8080/delete/:id dengan method DELETE
5. <img width="638" alt="Screenshot 2022-10-09 131108" src="https://user-images.githubusercontent.com/54648155/194741111-47c1ab2b-c273-4a2a-bfdd-63f0796a78f9.png">

Gambar ERD Car Management Dashboard (hanya satu entitas):


![ERD Binar](https://user-images.githubusercontent.com/54648155/194741137-35079b6a-6e42-4ef3-a3f7-5eb48c7f350e.png)
