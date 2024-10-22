/*----------------------------------- Input data product-----------------------------------*/ //เนื่องจากผมพิม
function validateForm(){
    //กำหนดค่าตัวแปร เพื่ออ้างอิงไปหา id ใน html รับค่าเป็น value
    let Id_product = document.getElementById("Id_product").value;
    let product_name = document.getElementById("product_name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;

    //กรณีไม่กรอกข้อมูลในช่อง input ระบบจะขึ้น alert
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
    //เนื่องจาก reference ในการระบุตัวแปรของ localStorage เป็น var เลยกำหนดเป็น var ผมไม่แน่ใจว่าสามารถใช้ let ได้หรือไม่
    var dataList;
    if(localStorage.getItem("dataList") == null){ // localStorage.getItem รับค่าของรายการที่เก็บข้อมูลภายใน dataList ซึ่งเป็น array 
        dataList = [];
    }
    else{
        dataList = JSON.parse(localStorage.getItem("dataList")); //ดึงข้อมูลที่ถูกจัดเก็บไว้ใน localStorage แปลงเป็นรูปแบบของ JavaScript Object โดย JSON.parse
    }

    var html = ""; //ประกาศ html เป็น ค่าว่าง เพื่อที่จะนำข้อมูลที่ input เข้ามา ตอนนี้อยู่ในรูปแบบ Object นำข้อมูลกรอกลงในตารางแสดงผลบน html ดังนี้

    dataList.forEach(function (element, index){
        html += "<tr>"
            html += `<td><input type="checkbox" class="itemCheckbox" id="checklist_${index}" name="checklist" onclick="calculateTotal(), updateSelectedCart()"></td>`; //กล่อง checklist
            html += "<td>" + element.Id_product + "</td>"; 
            html += "<td>" + element.product_name + "</td>";
            html += "<td class='price'>" + element.price + "</td>";
            html += `<td><img src='${element.image}' width='80' height='80'/></td>`;
            //เพิ่มปุ่ม deleteData และ updateData
            html += `
                    <td>
                    <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
                    <button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button>
                    </td>
                    `;
        html += "</tr>";        
    });

    document.querySelector("#crudtable tbody").innerHTML = html; //เพื่ออัปเดตหรือแทนที่เนื้อหาภายในส่วน tbody ของตาราง (ที่มี id="crudtable") ด้วยเนื้อหา HTML ที่กำหนดในตัวแปร html.
}

/*----------------------------------- Toggle Select All Checkboxes -----------------------------------*/
function toggleSelectAll() {
    
    var selectAllCheckbox = document.getElementById("selectAll"); //กำหนดตัวแปรอ้างอิง ไปที่ id selectAll ที่อยู่ใน html
    var checkboxes = document.querySelectorAll('.itemCheckbox'); //กำหนดตัวแปรอ้างอิง(อยู่ในไฟล์ js.) ไปที่ html += `<td><input type="checkbox" class="itemCheckbox" id="checklist_${index}" name="checklist" onclick="calculateTotal(), updateSelectedCart()"></td>`

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = selectAllCheckbox.checked;
    });

    // คำนวณราคาใหม่และอัปเดตตารางสินค้าที่เลือก
    calculateTotal(); //กำหนดฟังก์ชันการคำนวณ
    updateSelectedCart(); //กำหนดฟังก์ชันการคลิกเลือก cart
}

/*----- Load All data---------*/
window.onload = showData;

/*----------------------------------- Add data on table -----------------------------------*/
function AddData(){
    if(validateForm() == true){
        let Id_product = document.getElementById("Id_product").value;
        let product_name = document.getElementById("product_name").value;
        let price = document.getElementById("price").value;
        let image = document.getElementById("image").value;

        var dataList;
        if(localStorage.getItem("dataList") == null){
            dataList = [];
        }
        else{
            dataList = JSON.parse(localStorage.getItem("dataList"));
        }

        // เพิ่มข้อมูลใหม่ลงใน dataList
        dataList.push({
            Id_product: Id_product,
            product_name: product_name,
            price: price,
            image: image,
        });

        // บันทึกข้อมูลลง LocalStorage
        localStorage.setItem("dataList", JSON.stringify(dataList));

        // แสดงข้อมูลใหม่ในตาราง
        showData();

        // ล้างค่าใน input fields หลังจากเพิ่มข้อมูลเสร็จ
        document.getElementById("Id_product").value = "";
        document.getElementById("product_name").value = "";
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
    document.getElementById("Id_product").value = dataList[index].Id_product;
    document.getElementById("product_name").value = dataList[index].product_name;
    document.getElementById("price").value = dataList[index].price;
    document.getElementById("image").value = dataList[index].image;

    // เมื่อคลิกปุ่ม Update
    document.querySelector("#Update").onclick = function () {
        if (validateForm() === true) {
            // แก้ไขข้อมูลใน dataList
            dataList[index].Id_product = document.getElementById("Id_product").value;
            dataList[index].product_name = document.getElementById("product_name").value;
            dataList[index].price = document.getElementById("price").value;
            dataList[index].image = document.getElementById("image").value;

            // อัปเดต localStorage ด้วยข้อมูลที่แก้ไขแล้ว
            localStorage.setItem("dataList", JSON.stringify(dataList));

            // แสดงข้อมูลที่อัปเดตแล้วในตาราง
            showData();

            // ล้างค่าใน input fields หลังจากการอัปเดตเสร็จ
            document.getElementById("Id_product").value = "";
            document.getElementById("product_name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("image").value = "";

            // เปลี่ยนปุ่มกลับเป็น Add Data
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    };
};

/*----------------------------------- Calculate Total Price -----------------------------------*/
function calculateTotal() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"].itemCheckbox:checked');
    var total = 0;

    checkboxes.forEach(function (checkbox) {
        // ดึงค่า price จากแถวที่เลือก
        var row = checkbox.closest('tr');
        var price = parseFloat(row.querySelector('.price').innerText);
        total += price;
    });

    // แสดงผลรวมของราคาสินค้าในหน้าจอ
    document.getElementById("totalPrice").innerHTML = "Total Price: " + total.toFixed(2) + "฿";
}

/*----------------------------------- Update Selected Cart -----------------------------------*/
function updateSelectedCart() {
    var selectedCart = document.querySelector("#selectedCart tbody");
    selectedCart.innerHTML = ""; // ล้างข้อมูลเดิมในตารางที่เลือก

    var checkboxes = document.querySelectorAll('input[type="checkbox"].itemCheckbox:checked');

    checkboxes.forEach(function (checkbox) {
        var row = checkbox.closest('tr');
        var Id_product = row.cells[1].innerText;
        var product_name = row.cells[2].innerText;
        var price = row.cells[3].innerText;
        var image = row.cells[4].innerHTML; // ใช้ innerHTML สำหรับรูปภาพ

        var selectedRow = `
            <tr>
                <td>${Id_product}</td>
                <td>${product_name}</td>
                <td>${price}</td>
                <td>${image}</td>
            </tr>
        `;

        // เพิ่มข้อมูลสินค้าที่เลือกไปยังตารางที่แสดงด้านล่าง
        selectedCart.innerHTML += selectedRow;
    });
}

function clearSelectedCart() {
    var selectedCart = document.querySelector("#selectedCart tbody");
    selectedCart.innerHTML = ""; // ล้างข้อมูลในตารางที่เลือก
}