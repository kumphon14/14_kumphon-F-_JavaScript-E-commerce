/*----------------------------------- Input data-----------------------------------*/
function validateForm(){
    let Id_product = document.getElementById("Id_prodcut").value;
    let product_name = document.getElementById("prodcut_name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;

    if(Id_product == ""){
        alert("Id_product is required");
        return false;
    }

    if(product_name == ""){
        alert("product_name is required");
        return false;
    }

    if(price == ""){
        alert("price is required");
        return false;
    }

    if(image == ""){
        alert("image is required");
        return false;
    }

    return true;
};

/*----------------------------------- Show data on table -----------------------------------*/

function showData(){
    var dataList;
    if(localStorage.getItem("dataList") == null){
        dataList = [];
    }
    else{
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }

    var html = "";

    dataList.forEach(function (element, index){
        html += "<tr>"
            html += "<td>" + element.Id_product + "</td>";
            html += "<td>" + element.product_name + "</td>";
            html += "<td>" + element.price + "</td>";
            html += "<td><img src='" + element.image + "' width='50' height='50'/></td>";
            html += `
                    <td>
                    <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
                    <button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button>
                    </td>
                    `;
        html += "</tr>";        
    });

    document.querySelector("#crudtable tbody").innerHTML = html;
};

/*----- Load All data---------*/
document.onload = showData();

/*----------------------------------- Add data on table -----------------------------------*/
function AddData(){
    if(validateForm() == true){
        let Id_product = document.getElementById("Id_prodcut").value;
        let product_name = document.getElementById("prodcut_name").value;
        let price = document.getElementById("price").value;
        let image = document.getElementById("image").value;

        var dataList;
        if(localStorage.getItem("dataList") == null){
            dataList = [];
        }
        else{
            dataList = JSON.parse(localStorage.getItem("dataList"));
        }

        dataList.push({
            Id_product: Id_product,
            product_name: product_name,
            price: price,
            image: image,
        });

        localStorage.setItem("dataList", JSON.stringify(dataList));
        showData();
        document.getElementById("Id_prodcut").value = "";
        document.getElementById("prodcut_name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";
    }
};

/*----------------------------------- Delete data on table -----------------------------------*/
function deleteData(index){
    var dataList;
    if(localStorage.getItem("dataList") == null){
        dataList = [];
    } else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }

    // ลบข้อมูลจากรายการ dataList โดยใช้ index ที่ส่งเข้ามา
    dataList.splice(index, 1);

    // อัปเดต localStorage ด้วยข้อมูลที่ลบแล้ว
    localStorage.setItem("dataList", JSON.stringify(dataList));

    // เรียกใช้ฟังก์ชัน showData() เพื่ออัปเดตตารางที่แสดงผล
    showData();
};

/*----------------------------------- update data on table ------------------------*/
function updateData(index) {
    // ซ่อนปุ่ม Add Data และแสดงปุ่ม Update
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    } else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }

    // กรอกข้อมูลจากตารางไปที่ input fields
    document.getElementById("Id_prodcut").value = dataList[index].Id_product;
    document.getElementById("prodcut_name").value = dataList[index].product_name;
    document.getElementById("price").value = dataList[index].price;
    document.getElementById("image").value = dataList[index].image;

    // เมื่อคลิกปุ่ม Update
    document.querySelector("#Update").onclick = function () {
        if (validateForm() === true) {
            // แก้ไขข้อมูลใน dataList
            dataList[index].Id_product = document.getElementById("Id_prodcut").value;
            dataList[index].product_name = document.getElementById("prodcut_name").value;
            dataList[index].price = document.getElementById("price").value;
            dataList[index].image = document.getElementById("image").value;

            // อัปเดต localStorage ด้วยข้อมูลที่แก้ไขแล้ว
            localStorage.setItem("dataList", JSON.stringify(dataList));

            // แสดงข้อมูลที่อัปเดตแล้วในตาราง
            showData();

            // ล้างค่าใน input fields หลังจากการอัปเดตเสร็จ
            document.getElementById("Id_prodcut").value = "";
            document.getElementById("prodcut_name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("image").value = "";

            // เปลี่ยนปุ่มกลับเป็น Add Data
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    };
};
