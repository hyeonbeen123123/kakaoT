import { User } from "../user/user.model.js";

export async function create(req, res, next){
    const {email, latitude, longitude} = req.body;
    console.log(`승객${email}의 위치(${latitude},${longitude})로 주변 택시를 검색`);

    //탑승자의 위도, 경도만 넘겨서 찾음
    const founds = await User.getDriver({latitude,longitude});
    console.log(JSON.stringify(founds));
}
