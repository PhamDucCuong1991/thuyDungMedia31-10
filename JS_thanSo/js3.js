setTimeout(() => {
    let _fullName = '';
    let _birthday = '';
    var audios = [];
    var endpoint = 'https://sohoc.one';
    //var endpoint = 'http://satsi.one';
    var mainData = {};
    const loiTua = '/Upload/Templates/Audios/LoiTua/1.mp3';
    const loiKet = '/Upload/Templates/Audios/tktang/AudioLoiKet/1.mp3';
    var currentAudio = 0;
    var audioPaths = [];
    var playIntro = false;

    function formatNumber(number) {
        return number > 9 ? `${number}` : `0${number}`;
    }

    function setAudio() {
        let audio = $("#AUDIOPLAYER")[0];
        $('#AUDIOPLAYER source').each(function (num, val) {
            $(this).remove();
        });

        if (audios.length > 0) {
            var source = document.createElement('source');
            source.src = endpoint + mainData['SoDuongDoi_Audio2'];
            audio.appendChild(source);

            audio.addEventListener('ended', function () {
                audio.src = endpoint + mainData['SoLinhHon_Audio'];
                audio.pause();
                audio.load();
                audio.play();
            });
        }
    }

    function getAudios(data) {
        mainData = data;
        // get all audio paths
        Object.keys(data).map(t => {
            if (t.includes('_Audio') && data[t] !== '') {
                audios.push({
                    [t]: data[t].split(',').filter(t => t !== '').map(t => t)
                });
            }
        });

        setAudio();
    }


    // download audio file
    $('#BUTTON_TEXT1036').click(function () {
        const Code = $('#FORM_ITEM1037 input').val();
        if (Code) {
            $.ajax({
                url: endpoint + '/Customer/DownloadAudios',
                method: 'POST',
                data: {
                    Code
                },
                success: function (res) {
                    if (res.filePath) {
                        //window.open(`${endpoint}/${res.filePath}`, '_blank');
                        const a = document.createElement('a');
                        a.href = `${endpoint}${res.filePath}`;
                        document.body.appendChild(a);
                        a.click();
                    }
                },
                error: function (err) {
                    console.error(err);
                }
            });
        }
    });


    $('#btn_submit').click(function () {
        const FullName = $('#input_name input').val();
        const PhoneNumber = '';
        const day = formatNumber(parseInt($('#input_day input').val()));
        const month = formatNumber(parseInt($('#input_month input').val()));
        const year = formatNumber(parseInt($('#input_year input').val()));
        const DateOfBirth = `${day}/${month}/${year}`;

        _birthday = DateOfBirth;
        _fullName = FullName;

        if (FullName && DateOfBirth) {
            $.ajax({
                url: endpoint + '/Customer/FreeBookText',
                method: 'POST',
                data: {
                    FullName, PhoneNumber, DateOfBirth
                },
                success: function (res) {
                    bindData(res.data);

                    //popup-close
                    setTimeout(function () {
                        $('.popup-close').click();

                        $('html, body').animate({
                            scrollTop: $("#REPORT").offset().top
                        }, 200);
                    }, 500);

                    $('#preload-text').removeClass('visible').addClass('hidden');
                    $('#report-brief-text').removeClass('hidden').addClass('visible');

                },
                error: function (err) {
                    console.error(err);
                }
            });
        }
    });

    function showHtml(el, content) {
        if (content.indexOf('\n') > -1) {
            const text = content.split('\n');
            if (text.length > 0) {
                let html = '';
                for (const line of text) {
                    html += `<p>${line}</p>`;
                }
                el.html(html);
            } else {
                el.text(content);
            }
        } else {
            el.text(content);
        }
    }


    function bindData(data) {
        if (data) {

            //audio duong dời
            var soDuongDoiAudio = document.getElementById("AUDIOPLAYER-DUONGDOI");
            soDuongDoiAudio.src = endpoint + data['SoDuongDoi_Audio2'];
            var audio = document.getElementById('AUDIOPLAYER');
            audio.load();
            audio.pause();
            audio.currentTime = 0;
            getAudios(data);

            let duongdoip = data['SoDuongDoi_Content'].split('\n');
            let sumenhp = data['SoSuMenh_Content'].split('\n');
            let noitamp = data['SoLinhHon_Content'].split('\n');
            let tuongtacp = data['SoNhanCach_Content'].split('\n');
            let ngaysinhp = data['SoNgaySinh_Content'].split('\n');
            let noicamp = data['SoNoiCam_Content'].split('\n');
            let thaidop = data['SoThaiDo_Content'].split('\n');
            let nonghiepp = data['SoNoNghiep_Content'].split('\n');
            let bosungp = data['SoBoSung_Content'].split('\n');
            let solapp = data['SoLap_Content'].split('\n');
            let canbangp = data['SoCanBangTen_Content'].split('\n');
            let truongthanhp = data['SoTruongThanh_Content'].split('\n');
            let camxucp = data['SoTuDuyCamXuc_Content'].split('\n');
            let trainghiemp = data['SoTuDuyTraiNghiem_Content'].split('\n');
            let logicp = data['SoTuDuyLogic_Content'].split('\n');
            //let namp = data['SoNamSinh_Content'].split('\n');
            //let thangp = data['SoThangCaNhan_Content'].split('\n');
            //let baomatp = data['SoDiemBaoMat_Content'].split('\n');
            //let chukyp = data['SoChuKyVongDoi_Content'].split('\n');
            //let thachthuc1p = data['SoThachThuc_Content_1'].split('\n');
            //let thachthuc2p = data['SoThachThuc_Content_2'].split('\n');
            //let thachthuc3p = data['SoThachThuc_Content_3'].split('\n');
            //let thachthuc4p = data['SoThachThuc_Content_4'].split('\n');
            //let dinhcao1p = data['SoChangDuongDoi_num_content_1'].split('\n');
            //let dinhcao2p = data['SoChangDuongDoi_num_content_2'].split('\n');
            //let dinhcao3p = data['SoChangDuongDoi_num_content_3'].split('\n');
            //let dinhcao4p = data['SoChangDuongDoi_num_content_4'].split('\n');

            $('#report_duongdoi_content').html(duongdoip.join('</p><p>'));
            $('#report_sumenh_content').html(sumenhp.join('</p><p>'));
            $('#report_noitam_content').html(noitamp.join('</p><p>'));
            $('#report_tuongtac_content').html(tuongtacp.join('</p><p>'));
            $('#report_ngaysinh_content').html(ngaysinhp.join('</p><p>'));
            $('#report_noicam_content').html(noicamp.join('</p><p>'));
            $('#report_thaido_content').html(thaidop.join('</p><p>'));
            $('#report_nonghiep_content').html(nonghiepp.join('</p><p>'));
            $('#report_bosung_content').html(bosungp.join('</p><p>'));
            $('#report_solap_content').html(solapp.join('</p><p>'));
            $('#report_canbang_content').html(canbangp.join('</p><p>'));
            $('#report_truongthanh_content').html(truongthanhp.join('</p><p>'));
            //$('#report_thehe_content').html(thehep.join('</p><p>'));
            //$('#report_vanmenh_content').html(vanmenhp.join('</p><p>'));
            //$('#report_linhhon_content').html(linhhonp.join('</p><p>'));
            //$('#report_tiemthuc_content').html(tiemthucp.join('</p><p>'));
            //$('#report_trucgiac_content').html(trucgiacp.join('</p><p>'));
            $('#report_camxuc_content').html(camxucp.join('</p><p>'));
            $('#report_trainghiem_content').html(trainghiemp.join('</p><p>'));
            $('#report_logic_content').html(logicp.join('</p><p>'));
            //$('#report_nam_content').html(namp.join('</p><p>'));
            //$('#report_thang_content').html(thangp.join('</p><p>'));
            //$('#report_baomat_content').html(baomatp.join('</p><p>'));
            //$('#report_chuky_content').html(chukyp.join('</p><p>'));
            //$('#report_thachthuc1_content').html(thachthuc1p.join('</p><p>'));
            //$('#report_thachthuc2_content').html(thachthuc2p.join('</p><p>'));
            //$('#report_thachthuc3_content').html(thachthuc3p.join('</p><p>'));
            //$('#report_thachthuc4_content').html(thachthuc4p.join('</p><p>'));
            //$('#report_dinhcao1_content').html(dinhcao1p.join('</p><p>'));
            //$('#report_dinhcao2_content').html(dinhcao2p.join('</p><p>'));
            //$('#report_dinhcao3_content').html(dinhcao3p.join('</p><p>'));
            //$('#report_dinhcao4_content').html(dinhcao4p.join('</p><p>'));

            $('#report_duongdoi_num').text(data['SoDuongDoi']);
            $('#report_sumenh_num').html(data['SoSuMenh']);
            $('#report_noitam_num').html(data['SoLinhHon']);
            $('#report_tuongtac_num').html(data['SoNhanCach']);
            $('#report_ngaysinh_num').html(data['SoNgaySinh']);
            $('#report_noicam_num').html(data['SoNoiCam']);
            $('#report_thaido_num').html(data['SoThaiDo']);
            $('#report_nonghiep_num').html(data['SoNoNghiep']);
            $('#report_bosung_num').html(data['SoBoSung']);
            $('#report_solap_num').html(data['SoLap']);
            $('#report_canbang_num').html(data['SoCanBangTen']);
            $('#report_truongthanh_num').html(data['SoTruongThanh']);
            $('#report_thehe_num').html(data['SoTheHe']);
            $('#report_vanmenh_num').html(data['SoKetNoi1']);
            $('#report_linhhon_num').html(data['SoKetNoi2']);
            $('#report_tiemthuc_num').html(data['SoPhanHoiTiemThuc']);
            $('#report_trucgiac_num').html(data['SoTuDuyTrucGiac']);
            $('#report_camxuc_num').html(data['SoTuDuyCamXuc']);
            $('#report_trainghiem_num').html(data['SoTuDuyTraiNghiem']);
            $('#report_logic_num').html(data['SoTuDuyLogic']);
            $('#report_nam_num').html(data['SoNamSinh']);
            $('#report_thang_num').html(data['SoThangCaNhan']);
            $('#report_baomat_num').html(data['SoDiemBaoMat']);
            $('#report_chuky_num').html(data['SoChuKyVongDoi']);

            $('#report_chang1_num').html(data['SoChangDuongDoi_num_1']);
            $('#report_chang2_num').html(data['SoChangDuongDoi_num_2']);
            $('#report_chang3_num').html(data['SoChangDuongDoi_num_3']);
            $('#report_chang4_num').html(data['SoChangDuongDoi_num_4']);
            $('#report_thachthuc1_num').html(data['SoThachThuc_1']);
            $('#report_thachthuc2_num').html(data['SoThachThuc_2']);
            $('#report_thachthuc3_num').html(data['SoThachThuc_3']);
            $('#report_thachthuc4_num').html(data['SoThachThuc_4']);
            $('#report_tuoi1_num').html(data['SoChangDuongDoi_age_1']);
            $('#report_tuoi2_num').html(data['SoChangDuongDoi_age_2']);
            $('#report_tuoi3_num').html(data['SoChangDuongDoi_age_3']);
            $('#report_tuoi4_num').html(data['SoChangDuongDoi_age_4']);


            $('#c_namedobr').text(data['FULL_NAME'] + ', ' + data['DOB']);
            $('#c_namedob').text(data['FULL_NAME'] + ', ' + data['DOB']);
            $('#c_name_1').text(data['FULL_NAME']);
            $('#c_dob_1').text(data['DOB']);
            $('#s_sonoitam_1').text(data['SoLinhHon']);
            $('#s_sonoitam_2').text(data['SoLinhHon']);
            $('#s_sonoitam_3').text(data['SoLinhHon']);
            $('#s_sonoitam_4').text(data['SoLinhHon']);
            $('#s_sonoicam_1').text(data['SoNoiCam']);
            $('#s_sonoicam_2').text(data['SoNoiCam']);
            $('#s_sonoicam_3').text(data['SoNoiCam']);
            $('#s_sonoicam_4').text(data['SoNoiCam']);
            $('#s_sotuongtac_1').text(data['SoNhanCach']);
            $('#s_sotuongtac_2').text(data['SoNhanCach']);
            $('#s_sotuongtac_3').text(data['SoNhanCach']);
            $('#s_sotuongtac_4').text(data['SoNhanCach']);
            $('#s_sothaido_1').text(data['SoThaiDo']);
            $('#s_sothaido_2').text(data['SoThaiDo']);
            $('#s_sothaido_3').text(data['SoThaiDo']);
            $('#s_sothaido_4').text(data['SoThaiDo']);
            $('#s_solap_1').text(data['SoLap']);
            $('#s_solap_2').text(data['SoLap']);
            $('#s_solap_3').text(data['SoLap']);
            $('#s_solap_4').text(data['SoLap']);
            $('#s_ddsm_1').text(data['SoKetNoi1']);
            $('#s_ddsm_2').text(data['SoKetNoi1']);
            $('#s_ddsm_3').text(data['SoKetNoi1']);
            $('#s_ddsm_4').text(data['SoKetNoi1']);
            $('#s_nttt_1').text(data['SoKetNoi2']);
            $('#s_nttt_2').text(data['SoKetNoi2']);
            $('#s_nttt_3').text(data['SoKetNoi2']);
            $('#s_nttt_4').text(data['SoKetNoi2']);
            $('#s_sobosung_1').text(data['SoBoSung']);
            $('#s_sobosung_2').text(data['SoBoSung']);
            $('#s_sobosung_3').text(data['SoBoSung']);
            $('#s_sobosung_4').text(data['SoBoSung']);
            $('#s_socanbang_1').text(data['SoCanBangTen']);
            $('#s_socanbang_2').text(data['SoCanBangTen']);
            $('#s_socanbang_3').text(data['SoCanBangTen']);
            $('#s_socanbang_4').text(data['SoCanBangTen']);
            $('#s_sothehe_1').text(data['SoTheHe']);
            $('#s_sothehe_2').text(data['SoTheHe']);
            $('#s_sothehe_3').text(data['SoTheHe']);
            $('#s_sothehe_4').text(data['SoTheHe']);

            //$('#s_sononghiep_1').text(data['SoNoNghiep']);
            //$('#s_sononghiep_2').text(data['SoNoNghiep']);
            //$('#s_sononghiep_3').text(data['SoNoNghiep']);
            //$('#s_sononghiep_4').text(data['SoNoNghiep']);
            $('#s_soduongdoi_1').text(data['SoDuongDoi']);

            $('#s_soduongdoi_2').text(data['SoDuongDoi']);
            $('#s_soduongdoi_3').text(data['SoDuongDoi']);
            $('#s_soduongdoi_4').text(data['SoDuongDoi']);
            $('#s_sodienthoai_1').text(data['SoDienThoai']);
            $('#s_sodienthoai_2').text(data['SoDienThoai']);
            $('#s_sodienthoai_3').text(data['SoDienThoai']);
            $('#s_sodienthoai_4').text(data['SoDienThoai']);
            $('#s_thangcanhan_1').text(data['SoThangCaNhan']);
            $('#s_thangcanhan_2').text(data['SoThangCaNhan']);
            $('#s_thangcanhan_3').text(data['SoThangCaNhan']);
            $('#s_thangcanhan_4').text(data['SoThangCaNhan']);
            $('#s_namcanhan_1').text(data['SoNamSinh']);
            $('#s_namcanhan_2').text(data['SoNamSinh']);
            $('#s_namcanhan_3').text(data['SoNamSinh']);
            $('#s_namcanhan_4').text(data['SoNamSinh']);

            $('#s_sochangfull_1').text(`${data['SoChangDuongDoi_num_1']},${data['SoChangDuongDoi_num_2']},${data['SoChangDuongDoi_num_3']},${data['SoChangDuongDoi_num_4']}`);
            $('#s_sochangfull_2').text(`${data['SoChangDuongDoi_num_1']},${data['SoChangDuongDoi_num_2']},${data['SoChangDuongDoi_num_3']},${data['SoChangDuongDoi_num_4']}`);
            $('#s_sochangfull_3').text(`${data['SoChangDuongDoi_num_1']},${data['SoChangDuongDoi_num_2']},${data['SoChangDuongDoi_num_3']},${data['SoChangDuongDoi_num_4']}`);
            $('#s_sochangfull_4').text(`${data['SoChangDuongDoi_num_1']},${data['SoChangDuongDoi_num_2']},${data['SoChangDuongDoi_num_3']},${data['SoChangDuongDoi_num_4']}`);
            $('#s_sothachthucfull_1').text(`${data['SoThachThuc_1']},${data['SoThachThuc_2']},${data['SoThachThuc_3']},${data['SoThachThuc_4']}`);
            $('#s_sothachthucfull_2').text(`${data['SoThachThuc_1']},${data['SoThachThuc_2']},${data['SoThachThuc_3']},${data['SoThachThuc_4']}`);
            $('#s_sothachthucfull_3').text(`${data['SoThachThuc_1']},${data['SoThachThuc_2']},${data['SoThachThuc_3']},${data['SoThachThuc_4']}`);
            $('#s_sothachthucfull_4').text(`${data['SoThachThuc_1']},${data['SoThachThuc_2']},${data['SoThachThuc_3']},${data['SoThachThuc_4']}`);

            $('#s_sochang1_1').text(data['SoChangDuongDoi_num_1']);
            $('#s_sochang1_2').text(data['SoChangDuongDoi_num_1']);
            $('#s_sochang2_1').text(data['SoChangDuongDoi_num_2']);
            $('#s_sochang2_2').text(data['SoChangDuongDoi_num_2']);
            $('#s_sochang3_1').text(data['SoChangDuongDoi_num_3']);
            $('#s_sochang3_2').text(data['SoChangDuongDoi_num_3']);
            $('#s_sochang4_1').text(data['SoChangDuongDoi_num_4']);
            $('#s_sochang4_2').text(data['SoChangDuongDoi_num_4']);
            $('#s_sothachthuc1_1').text(data['SoThachThuc_1']);
            $('#s_sothachthuc1_2').text(data['sothachthucDuongDoi_num_1']);
            $('#s_sothachthuc2_1').text(data['SoThachThuc_2']);
            $('#s_sothachthuc2_2').text(data['SoThachThuc_2']);
            $('#s_sothachthuc3_1').text(data['SoThachThuc_3']);
            $('#s_sothachthuc3_2').text(data['SoThachThuc_3']);
            $('#s_sothachthuc4_1').text(data['SoThachThuc_4']);
            $('#s_sothachthuc4_2').text(data['SoThachThuc_4']);
            $('#s_sosumenh_1').text(data['SoSuMenh']);
            $('#s_sosumenh_2').text(data['SoSuMenh']);
            $('#s_songaysinh_1').text(data['SoNgaySinh']);
            $('#s_songaysinh_2').text(data['SoNgaySinh']);
            $('#s_songaysinh_3').text(data['SoNgaySinh']);
            $('#s_songaysinh_4').text(data['SoNgaySinh']);
            $('#s_sotruongthanh_1').text(data['SoTruongThanh']);
            $('#s_sotruongthanh_2').text(data['SoTruongThanh']);
            $('#s_tuoichang1_1').text(data['SoChangDuongDoi_age_1']);
            $('#s_tuoichang1_2').text(data['SoChangDuongDoi_age_1']);
            $('#s_tuoichang2_1').text(data['SoChangDuongDoi_age_2']);
            $('#s_tuoichang2_2').text(data['SoChangDuongDoi_age_2']);
            $('#s_tuoichang3_1').text(data['SoChangDuongDoi_age_3']);
            $('#s_tuoichang3_2').text(data['SoChangDuongDoi_age_3']);
            $('#s_tuoichang4_1').text(data['SoChangDuongDoi_age_4']);
            $('#s_tuoichang4_2').text(data['SoChangDuongDoi_age_4']);
            $('#s_sonam1_1').text(data['nam1']);
            $('#s_sonam1_2').text(data['nam1']);
            $('#s_sonam2_1').text(data['nam2']);
            $('#s_sonam2_2').text(data['nam2']);
            $('#s_sonam3_1').text(data['nam3']);
            $('#s_sonam3_2').text(data['nam3']);
            $('#s_sonam4_1').text(data['nam4']);
            $('#s_sonam4_2').text(data['nam4']);
            $('#s_sobaomat_1').text(data['SoDiemBaoMat']);
            $('#s_sobaomat_2').text(data['SoDiemBaoMat']);
            $('#s_sobaomat_3').text(data['SoDiemBaoMat']);
            $('#s_sobaomat_4').text(data['SoDiemBaoMat']);
            $('#s_sotiemthuc_1').text(data['SoPhanHoiTiemThuc']);
            $('#s_sotiemthuc_2').text(data['SoPhanHoiTiemThuc']);
            $('#s_sotiemthuc_3').text(data['SoPhanHoiTiemThuc']);
            $('#s_sotiemthuc_4').text(data['SoPhanHoiTiemThuc']);
            $('#s_sotrucgiac_1').text(data['SoTuDuyTrucGiac']);
            $('#s_sotrucgiac_2').text(data['SoTuDuyTrucGiac']);
            $('#s_sotrucgiac_3').text(data['SoTuDuyTrucGiac']);
            $('#s_sotrucgiac_4').text(data['SoTuDuyTrucGiac']);
            $('#s_sotrainghiem_1').text(data['SoTuDuyTraiNghiem']);
            $('#s_sotrainghiem_2').text(data['SoTuDuyTraiNghiem']);
            $('#s_sotrainghiem_3').text(data['SoTuDuyTraiNghiem']);
            $('#s_sotrainghiem_4').text(data['SoTuDuyTraiNghiem']);
            $('#s_sologic_1').text(data['SoTuDuyLogic']);
            $('#s_sologic_2').text(data['SoTuDuyLogic']);
            $('#s_sologic_3').text(data['SoTuDuyLogic']);
            $('#s_sologic_4').text(data['SoTuDuyLogic']);
            $('#s_socamxuc_1').text(data['SoTuDuyCamXuc']);
            $('#s_socamxuc_2').text(data['SoTuDuyCamXuc']);
            $('#s_socamxuc_3').text(data['SoTuDuyCamXuc']);
            $('#s_socamxuc_4').text(data['SoTuDuyCamXuc']);
            //$('#so_chuky_1').text(data['SoChuKyVongDoi']);
            //$('#so_chuky_2').text(data['SoChuKyVongDoi']);
            //$('#so_chuky_3').text(data['SoChuKyVongDoi']);
            //$('#so_chuky_4').text(data['SoChuKyVongDoi']);

            setBieuDo(data)
        }
    }

    $('#btnDownloadPdf').click(function () {
        const FullName = _fullName;
        const PhoneNumber = '';
        const DateOfBirth = _birthday;
        if (FullName && DateOfBirth) {
            $.ajax({
                url: endpoint + '/Customer/dowloadFreePdf',
                method: 'POST',
                data: {
                    FullName, PhoneNumber, DateOfBirth
                },
                success: function (res) {
                    //download(endpoint + res.pdfPath);
                    openPDF(endpoint + res.pdfPath);
                },
                error: function (err) {
                    console.error(err);
                }
            });
        }
    });


    function download(url) {
        setTimeout(() => {
            var link = document.createElement("a");
            link.download = url.substr(url.lastIndexOf('/') + 1);
            ;
            link.target = '_blank';
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;
        }, 1000);
    }

    function openPDF(pdf) {
        window.open(pdf);
        return false;
    }


    function setBieuDo(data) {
        if (data['SoBieuDoNgaySinh_Content'].includes('ns1')) {
            $('#s_ns1').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns1')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns2')) {
            $('#s_ns2').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns2')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns3')) {
            $('#s_ns3').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns3')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns4')) {
            $('#s_ns4').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns4')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns5')) {
            $('#s_ns5').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns5')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns6')) {
            $('#s_ns6').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns6')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns7')) {
            $('#s_ns7').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns7')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns8')) {
            $('#s_ns8').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns8')).split('-')[1]);
        }
        if (data['SoBieuDoNgaySinh_Content'].includes('ns9')) {
            $('#s_ns9').text(data['SoBieuDoNgaySinh_Content'].split('#').find(t => t.includes('ns9')).split('-')[1]);
        }

        if (data['SoBieuDoHoTen_Content'].includes('ht1')) {
            $('#s_ht1').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht1')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht2')) {
            $('#s_ht2').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht2')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht3')) {
            $('#s_ht3').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht3')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht4')) {
            $('#s_ht4').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht4')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht5')) {
            $('#s_ht5').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht5')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht6')) {
            $('#s_ht6').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht6')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht7')) {
            $('#s_ht7').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht7')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht8')) {
            $('#s_ht8').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht8')).split('-')[1]);
        }
        if (data['SoBieuDoHoTen_Content'].includes('ht9')) {
            $('#s_ht9').text(data['SoBieuDoHoTen_Content'].split('#').find(t => t.includes('ht9')).split('-')[1]);
        }

        //$('#c_thangsinh_1').text(data['SoThangCaNhan'].split(',')[0]);
        //$('#c_ngaysinh_1').text(data['SoNgaySinh'].split(',')[0]);
        //$('#c_namsinh_1').text(data['SoNamSinh'].split(',')[0]);
    }
});