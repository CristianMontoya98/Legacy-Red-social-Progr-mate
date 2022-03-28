import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Formnews.module.css";
import logo from "../../assets/images/logo-a-color-.jpg";
import { getData, sendData, updateData } from "../../helpers/fetch";
import { DataContext } from "../../context/DataContext";
import HardSkills from "./HardSkills";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormNews = () => {
    const { posts, setPosts, idUser } = useContext(DataContext);

    const { user_info, title, type, description, image, technologies } = posts;

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setPosts({ ...posts, type: "news" });
    }, []);

    //send data from the new to the model post 
    const submitData = async (e) => {
        e.preventDefault();

// condition to publish news
        if (posts.title.length <= 0 || posts.description.length <= 0) {
            Swal.fire({
                title: "Completar datos",
                text: "Los campos de Nombre de la noticia y Contenido escrito son obligatorios",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "black",
                timer: "6000",
            });
        } else {
            try {
                if (!params.id) {
                    await sendData("posts", {
                        user_info: idUser,
                        title,
                        description,
                        image,
                        technologies,
                        type,
                    });
                } else {
                    await updateData("posts", params.id, {
                        user_info: idUser,
                        title,
                        description,
                        image,
                        technologies,
                        type,
                    });
                }

                navigate("/questions");
            }
             catch (error) {
                console.log(error);
            }
        }
    };

    const onChange = ({ target }) => {
        const { name, value } = target;
        setPosts({
            ...posts,
            [name]: value,
        });
    };

    const [technical, setTechnical] = useState([]);
    const onKeyTechnologies = (e) => {
        if (e.key === "Enter" && e.target.value.length > 0) {
            technical.push(e.target.value);
            setPosts({
                ...posts,
                technologies: technical,
            });
            e.target.value = "";
            e.preventDefault();
        }
    };

    const getDataNews = async (id) => {
        try {
            const dataNews = await getData("posts", id);
            setPosts(dataNews);
            setTechnical(dataNews.technologies);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getDataNews(params.id);
        }
    }, []);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size < 200000) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function load() {
                setPosts({ ...posts, image: reader.result });
            };
        } else {
            alert(`El tamaño máximo es 200 KB`);
        }
    };

    return (
        <Fragment>
        <div className={styles.headerPerfil}>
                <img src={logo} alt="Educamás" />
                <h2>Agregar Noticia</h2>
            </div>
            <form className={styles.form_container} onSubmit={submitData}>
                <div className={styles.form}>
                    <h3>Nombre de la noticia</h3>

                    <input
                        className={styles.nom_input}
                        type="text"
                        placeholder="Nombre de la noticia"
                        name="title"
                        value={posts.title}
                        onChange={onChange}
                    />

                    <br />
                </div>

                <div className={styles.form}>
                    <h3>Contenido escrito de la misma</h3>
                    <textarea
                        placeholder="Breve descripción de la noticia" 
                        className={styles.textarea}
                        type="text"
                        name="description"
                        rows=""
                        cols=""
                        value={posts.description}
                        onChange={onChange}
                    ></textarea>
                    <br />
                </div>

                <div className={styles.form}>
                    <h3 className={styles.subtitle}>Tecnologías</h3>
                    <input
                        className={styles.nom_input}
                        placeholder="Tecnologías <Enter> para guardarla"
                        type="text"
                        name="tecno"
                        onKeyDown={onKeyTechnologies}
                    />
                    <br />
                    <div className={styles.tecno}>
                        {technical.map((skill, index) => (
                            <HardSkills
                                skill={skill}
                                key={index}
                                technical={technical}
                                setTechnical={setTechnical}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.form}>
                    <h3>Imagen</h3>

                    <input
                        className={styles.image}
                        type="file"
                        name="image"
                        onChange={onFileChange}
                    />
                    {posts.images ? (
                        <img src={posts.image} alt="File" />
                    ) : null}
                    <br />
                </div>
                <div className={styles.send}>
                    <button className="btn" onClick={navigate}>Enviar</button>
                </div>
            </form>
            </Fragment>
    );
};

export default FormNews;
