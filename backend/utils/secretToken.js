import jwt from "jsonwebtoken";
import {env} from "envgaurd";
export const genTokenAndSetCookie = (id,res) => {
    const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: "15d",
    });

    res.cookie("token",token, {
        httpOnly: true,
        secure: env("STATUS") !=="dev", 
        sameSite: "Lax",
        maxAge: 15 * 24 * 60 * 60,
    });
}