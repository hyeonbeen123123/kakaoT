import { User } from "../user/user.model.js";
import { Booking } from "./booking.model.js";

function responseWithResult(res, statusCode){
    statusCode = statusCode || 200;
    return function(entity){
        res.status(statusCode).json(entity);
    }
}

function handleError(res, statusCode){
    statusCode = statusCode || 500;
    return function(err){
        //사용자 웹브라우저에 반환
        res.status(statusCode).send(err);
    }
}



export async function create(req, res, next){
    const {email, latitude, longitude} = req.body;
    console.log(`승객${email}의 위치(${latitude},${longitude})로 주변 택시를 검색`);

    //탑승자의 위도, 경도만 넘겨서 찾음
    const found = await User.getDriver({latitude,longitude});
    console.log(JSON.stringify(found));

    // 자동 부킹, DB에 저장
    Booking.create(
        !found // if문 택시기사를 못찾으면 ?{} 찾으면 :{}
        ? {}
        : {
            id: Date.now(),
            driver: found.email,
            user: email,
            status: "booked"
        },
    )
        .then((booking)=>{
            console.log(`booking:${booking}`);
            const tmp = Object.assign({},booking,{
                message: "부킹됐습니다" ,
            });
            console.log(`booking:${tmp}`);
            return tmp;
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}


