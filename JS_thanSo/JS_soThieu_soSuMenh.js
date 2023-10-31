function so_thieu_so_su_menh() {

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let ten = document.getElementById("fullname").value;
    let ngaySinh = document.getElementById("ngay").value;
    let thangSinh = document.getElementById("thang").value;
    let namSinh = document.getElementById("nam").value;

    ten = ten.toUpperCase();
    ten = ten.trim();
    removeAccents(ten);

    let arr = [];
    let arrTen = []; // so trong ten
    let soThieuTrongHoVaTen =[];

    function loaiBoSo0(a) {

        for (let i = 0; i < a.length; i++) {
            if (a[i] === 0) {
                a.splice(i, 1)
            }
        }
    }

    function daySoTen() {
        for (let i = ten.length - 1; i > 0; i--) {
            arrTen.unshift(str.indexOf(ten[i]) % 9 + 1);
            if (ten[i] === ' ') {
                break
            }
        }
    }

    daySoTen()

    loaiBoSo0(arrTen)


    function removeAccents() {
        var dauTiengViet = [
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ", "DĐ", "EÈẺẼÉẸÊỀỂỄẾỆ", "IÌỈĨÍỊ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ", "UÙỦŨÚỤƯỪỬỮỨỰ", "YỲỶỸÝỴ" ];
        for (var i = 0; i < dauTiengViet.length; i++) {

            var re = new RegExp('[' + dauTiengViet[i].substr(1) + ']', 'g');
            var char = dauTiengViet[i][0];

            ten = ten.replace(re, char);
        }
        return ten;
    }

    function daySoHoVaTen() {
        for (let i = 0; i < ten.length; i++) {
            if (ten[i] !== ' ') {
                arr.push(str.indexOf(ten[i]) % 9 + 1);
            }
        }
    }
    daySoHoVaTen();

    function soThieu() {
        for (let i = 1; i < 10; i++) {
            let kiemtra = true;
            for (let j = 0; j < arr.length; j++) {
                if (i === arr[j]) {
                    kiemtra = false
                    break;
                }
            }
            if (kiemtra === true) {
                soThieuTrongHoVaTen.push(i);
            }
        }
    }
    soThieu();

    function soSucManhTiemThuc() {
        return 9 - soThieuTrongHoVaTen.length;
    }

    document.getElementById("soSucManhTT").innerHTML += soSucManhTiemThuc();

    function soNgaySinh() {
        let tong = parseInt(ngaySinh[0])+ parseInt(ngaySinh[1]);
        if (tong > 9) {
            tong -= 9;
        }
        return (tong)
    }

    function soVanMenh() {

        let tong = arrTen[0];
        for (let i = 1; i < arrTen.length; i++) {
            tong += arrTen[i];
            if (tong > 9) {
                tong -= 9;
            }
        }
        return (tong)
    }

    function soTuDuyLyTri() {
        let sum;
        sum = soNgaySinh()+ parseInt(soVanMenh())
        if (sum > 9) {
            sum -= 9;
        }
        document.getElementById("soTuDuyLyTri").innerHTML += sum;
        return (sum)
    }
// console.log(soNgaySinh())
// console.log(soVanMenh())
   soTuDuyLyTri()


}