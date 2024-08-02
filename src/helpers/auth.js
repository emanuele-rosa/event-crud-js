export default function login(user, password) {

  if (user === password) {
    let token = jwt.sign({ user: user }, "#aBcDeFgH", { expiresIn: "1h" });
    res.json({ status: true, token: token });
  } else {
    return res
      .status(401)
      .json({ status: false, error: "Invalid credentials!" });
  }
}

export default function validate(){
    jwt.veri
}
