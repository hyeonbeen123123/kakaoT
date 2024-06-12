//몽고디비로 대체함
const Store = [
    {
        id : "123456", // 예약 번호
        driver : "test@driver.com",
        user : "Shindalsoo@driver.com",
        status : "booked", //canceled, end
    }
]

export const Booking = {
    create: async(user) => {
        if(Object.keys(user).length === 0) {
            console.log("내 주변의 택시가 없어 부킹 불가")
            return Promise.reject({
                message:"내 주변의 택시가 없어 부킹 불가"
            });
        } else {
            return Store.push(user); // DB에 저장함 + c
        }
    }
}