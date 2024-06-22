import "../../App.css"
import "./Questionnaire.css"
import {useContactContext} from "../../contexts/ContactContext.jsx";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/high-res.css'
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import {FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import {useNavigate, useNavigation, useParams} from "react-router-dom";
import axios from "axios";

function Contact() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const {contact, setContact} = useContactContext();
    const {disable, setDisable}=useConfiguratorContext()
    //saving changes
    const changeContact = (event) => {
        setContact({...contact, [event.target.name]: event.target.value});
    }

    const changePhoneNumber = (num, country) => {
        setContact({...contact, phone_number: {number: num, country: country}});
    }

    const {email} = useParams();
    const navigate = useNavigate()

    const deleteUser = e =>{
        e.preventDefault();
        axios.delete(`http://${import.meta.env.VITE_IP_ADRESS}:3000/${email}`)
            .then(response => {
                console.log(`Deleted post with ID ${email}`);
            })
            .catch(error => {
                console.error(error);
            });
        setDisable(false)
        navigate("/");
    }

    return (

        <div className={"m-2"}>
            <div className={"mb-3"}>
                <h5 data-testid={"question-contact"}>
                    {t('contact.q_contact')}
                </h5>
            </div>
            <FloatingLabel key={"firstname"}
                           data-testid={"label-contact-firstname"}
                           className={"mb-2"}
                           controlid="floatingInput"
                           label={t("contact.firstname")}>
            <Form.Control name={"firstname"} type="text" placeholder={"firstname"} defaultValue={contact["firstname"]}
                            data-testid={"input-contact-" + "firstname"}
                            readOnly={disable}
                            onChange={changeContact} />
            </FloatingLabel>
            <FloatingLabel key={"lastname"}
                           data-testid={"label-contact-lastname"}
                           className={"mb-2"}
                           controlid="floatingInput"
                           label={t("contact.lastname")}>
            <Form.Control name={"lastname"} type="text" placeholder={"lastname"} defaultValue={contact["lastname"]}
                            data-testid={"input-contact-" + "lastname"}
                          readOnly={disable}
                          onChange={changeContact} />
            </FloatingLabel>
            <PhoneInput key={"phone"} className={"mb-2"} country={contact.phone_number.country} onlyCountries={["be", "nl"]}
                        enableSearch={true}
                        searchPlaceholder={""}
                        disableSearchIcon={true} id="phone_number" name="phone_number" type="tel"
                        data-testid={"input-contact-phone"}
                        disabled={disable}
                        value={contact.phone_number.number} onChange={(value, country) => changePhoneNumber(value, country.countryCode)} />
            <FloatingLabel key={"email"}
                           data-testid={"label-contact-email"}
                           className={"mb-2"}
                           controlid="floatingInput"
                           readOnly={disable}
                           label={t("contact.email")}>
            <Form.Control name={"email"} type="text" placeholder={"email"} defaultValue={contact["email"]}
                            data-testid={"input-contact-" + "email"}
                            onChange={changeContact}
                            readOnly={disable}
            />
            </FloatingLabel>
            <table>
                <tbody>
                <tr>
                    <td>
                        <FloatingLabel key={"address"}
                                       data-testid={"label-contact-address"}
                                       className={"mb-2"}
                                       controlid="floatingInput"
                                       label={t("contact.address")}>
                            <Form.Control name={"address"} type="text" placeholder={"address"} defaultValue={contact["address"]}
                                          data-testid={"input-contact-" + "address"}
                                          onChange={changeContact}
                                          readOnly={disable}
                            />
                        </FloatingLabel>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <FloatingLabel key={"postcode"}
                                                   data-testid={"label-contact-postcode"}
                                                   className={"mb-2"}
                                                   controlid="floatingInput"
                                                   label={t("contact.postcode")}>
                                        <Form.Control name={"postcode"} type="text" placeholder={"postcode"} defaultValue={contact["postcode"]}
                                                      data-testid={"input-contact-" + "postcode"}
                                                      onChange={changeContact}
                                                      readOnly={disable}
                                        />
                                    </FloatingLabel>
                                </td>
                                <td>
                                    <FloatingLabel key={"city"}
                                                   data-testid={"label-contact-city"}
                                                   className={"mb-2"}
                                                   controlid="floatingInput"
                                                   label={t("contact.city")}>
                                        <Form.Control name={"city"} type="text" placeholder={"city"} defaultValue={contact["city"]}
                                                      data-testid={"input-contact-" + "city"}
                                                      onChange={changeContact}
                                                      readOnly={disable}
                                        />
                                    </FloatingLabel>
                                </td>
                            </tr>
                            </tbody>
                        </table>


                    </td>

                </tr>
                <tr>
                    <td>
                        <FloatingLabel key={"country"}
                                       data-testid={"label-contact-country"}
                                       className={"mb-2"}
                                       controlid="floatingInput"
                                       label={t("contact.country")}>
                            <Form.Control name={"country"} type="text" placeholder={"country"} defaultValue={contact["country"]}
                                          data-testid={"input-contact-" + "country"}
                                          onChange={changeContact}
                                          readOnly={disable}
                            />
                        </FloatingLabel>
                    </td>
                </tr>
                </tbody>

            </table>
            <Button variant={"danger"} type={"submit"}
            disabled={disable}>{t('contact.submit')}</Button>
            <Button variant={"danger"} type={"submit"} onClick={deleteUser}
                    hidden={!disable}>Delete</Button>
        </div>
    )
}

export default Contact;
