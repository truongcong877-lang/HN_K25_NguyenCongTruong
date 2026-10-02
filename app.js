let isSeatValid = false;
let totalRevenue = 0;
let totalTrips = 0;
let isRunning = true;

do {
    const choice = prompt(`
===========================================
    HỆ THỐNG BÁN VÉ NHÀ XE GREENLINE BUS
===========================================
1. Nhập và kiểm chuẩn mã đặt chỗ
2. Tính tiền vé xe khách
3. Thẩm định mã vé xe may mắn
0. Thoát chương trình
===========================================
Vui lòng nhập lựa chọn của bạn (0-3):
    `);

    if (choice === null) {
        console.log("Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 3.");
        continue;
    }

    const normalizedChoice = choice.trim();

    if (!["0", "1", "2", "3"].includes(normalizedChoice)) {
        console.log("Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 3.");
        continue;
    }

    switch (normalizedChoice) {
        case "1": {
            currentSeatCode = "";
            isSeatValid = false;

            let seatCode = prompt("Nhập mã phiếu:");

            if (seatCode === null) {
                console.log("Lỗi: Chưa nhập mã phiếu");
                break;
            }

            seatCode = seatCode.trim().toUpperCase();

            if (seatCode === "") {
                console.log("Lỗi: Chưa nhập mã phiếu");
                break;
            }

            if (seatCode.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
                break;
            }

            if (!seatCode.startsWith("BUS-")) {
                console.log("Lỗi: Sai tiền tố");
                break;
            }

            if (seatCode.includes(" ")) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa");
                break;
            }

            currentSeatCode = seatCode;
            isSeatValid = true;

            console.log("Kiểm chuẩn mã phiếu thành công!");
            console.log(`Mã phiếu: ${currentSeatCode}`);
            break;
        }

        case "2": {
            if (isSeatValid !== true) {
                console.log("Chưa có mã phiếu hợp lệ. Vui lòng chọn Case 1 trước.");
                break;
            }

            let seatCount;
            let pricePerSeat;
            let isCountCanceled = false;

            do {
                const seatInput = prompt("Nhập số lượng chỉ định xét nghiệm:");

                if (seatInput === null) {
                    console.log("Đã hủy giao dịch.");
                    isCountCanceled = true;
                    break;
                }

                seatCount = Number(seatInput.trim());

                if (seatInput.trim() === "" || !Number.isInteger(seatCount) || seatCount <= 0) {
                    console.log("Lỗi: Số lượng phải là số nguyên lớn hơn 0. Vui lòng nhập lại.");
                }
            } while (!Number.isInteger(seatCount) || seatCount <= 0);

            if (isCountCanceled) {
                break;
            }

            let isPriceCanceled = false;

            do {
                const priceInput = prompt("Nhập đơn giá mỗi chỉ định (VNĐ):");

                if (priceInput === null) {
                    console.log("Đã hủy giao dịch.");
                    isPriceCanceled = true;
                    break;
                }

                pricePerSeat = Number(priceInput.trim());

                if (priceInput.trim() === "" || !Number.isInteger(pricePerSeat) || pricePerSeat <= 0) {
                    console.log("Lỗi: Đơn giá phải là số nguyên lớn hơn 0. Vui lòng nhập lại.");
                }
            } while (!Number.isInteger(pricePerSeat) || pricePerSeat <= 0);

            if (isPriceCanceled) {
                break;
            }

            const baseCost = seatCount * pricePerSeat;
            let discount = 0;

            if (seatCount >= 4) {
                discount = Math.round(baseCost * 0.1);
            }

            const materialFee = Math.round((baseCost - discount) * 0.08);
            const totalPayment = (baseCost - discount) + materialFee;

            totalRevenue += totalPayment;
            totalTrips++;

            console.log("==================================================");
            console.log("              HÓA ĐƠN VÉ XE");
            console.log("==================================================");
            console.log(`Mã phiếu: ${currentSeatCode}`);
            console.log(`Số lượng: ${seatCount}`);
            console.log(`Đơn giá: ${pricePerSeat.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Chi phí cơ sở: ${baseCost.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Tiền giảm giá: ${discount.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Phụ phí: ${materialFee.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Tổng thanh toán: ${totalPayment.toLocaleString("vi-VN")} VNĐ`);
            console.log("==================================================");

            currentSeatCode = "";
            isSeatValid = false;
            break;
        }

        case "3": {
            let luckyCode = prompt("Nhập mã vé may mắn:");

            if (luckyCode === null) {
                console.log("Lỗi: Mã vé không hợp lệ");
                break;
            }

            luckyCode = luckyCode.trim();

            if (luckyCode === "") {
                console.log("Lỗi: Mã vé không được để trống");
                break;
            }

            if (!/^[0-9]+$/.test(luckyCode)) {
                console.log("Lỗi: Mã vé chỉ được chứa các chữ số từ 0 đến 9");
                break;
            }

            if (luckyCode.length < 2) {
                console.log("Lỗi: Mã vé phải có từ 2 chữ số trở lên");
                break;
            }

            if (/^0+$/.test(luckyCode)) {
                console.log("Lỗi: Mã vé không được toàn chữ số 0");
                break;
            }

            let reversedCode = "";

            for (let i = luckyCode.length - 1; i >= 0; i--) {
                reversedCode += luckyCode[i];
            }

            const isPalindrome = luckyCode === reversedCode;
            let digitSum = 0;

            for (let i = 0; i < luckyCode.length; i++) {
                digitSum += Number(luckyCode[i]);
            }

            const isDivisibleByNine = digitSum % 9 === 0;
            let prize = "";

            if (isPalindrome && isDivisibleByNine) {
                prize = "Giải Đặc biệt - Voucher gói khám chuyên sâu miễn phí trị giá 500.000 VNĐ";
            } else if (isPalindrome) {
                prize = "Giải Nhất - Voucher miễn phí khám răng tổng quát 200.000 VNĐ";
            } else if (isDivisibleByNine) {
                prize = "Giải Nhì - Voucher giảm 50.000 VNĐ lần khám kế tiếp";
            } else {
                prize = "Không trúng thưởng - Không có";
            }

            console.log("==================================================");
            console.log("             THẨM ĐỊNH MÃ VÉ");
            console.log("==================================================");
            console.log(`Mã số gốc: ${luckyCode}`);
            console.log(`Mã đảo ngược: ${reversedCode}`);
            console.log(`Tổng chữ số: ${digitSum}`);
            console.log(`Chia hết cho 9: ${isDivisibleByNine ? "Có" : "Không"}`);
            console.log(`Giải thưởng: ${prize}`);
            console.log("==================================================");
            break;
        }

        case "0": {
            console.log("Cảm ơn bạn đã sử dụng dịch vụ");
            console.log(`Tổng số giao dịch: ${totalTrips}`);
            console.log(`Tổng doanh thu: ${totalRevenue.toLocaleString("vi-VN")} VNĐ`);
            isRunning = false;
            break;
        }
    }
} while (isRunning);

