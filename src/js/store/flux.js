const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],
            userForEdit: null,
            registerOk: true,
            reportes_disponibles: [],
            reportes_no_disponibles: [],
            userName: "invitado",
            user: { username: "invitado", dni: "", admin: "", email: "", url_image: "invitado" },
            trigger: false,
            dataEstadisticas: {}
        },
        actions: {
            getAfiliacion: async (payload) => {
                const token = localStorage.getItem('token');
                const actions = getActions(); // Para acceder al logout directamente
            
                if (!token) {
                    console.error("El token es undefined. Asegurate de que esté guardado correctamente.");
                    actions.logout(); // Llamamos al logout si no hay token
                    return;
                }
                try{
                    const response = await fetch('https://e3digital.onrender.com/consulta-afiliado', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                            },
                        body: JSON.stringify(payload)
                    })
                    const data = await response.json();
                    // console.log("esta es la data entrante: ",data)

                    // Si el token es inválido, se recibe un código 401
                    if (response.status === 401) {
                        console.error("El token expiró o no es válido. Cerrando sesión...");
                        actions.logout(); // Logout automático
                        return;
                    }

                    if(!data.msg) throw new Error('algo salio mal en la solicitud')
                    alert(data.msg)
                }catch(e){
                    console.error(e)
                }
            },
            getStadistics: async (payload) => {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 120000); // 2min
            
                    let response = await fetch("https://e3digital.onrender.com/resultados_electorales", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989',
                        },
                        body: JSON.stringify(payload),
                        signal: controller.signal // Vinculamos el abort signal
                    });
            
                    clearTimeout(timeoutId); // Limpiamos el timeout si llega la respuesta
            
                    let data = await response.json();
                    console.log("Data entrante para resultados electorales: ", data);
            
                    if (!response.ok) {
                        throw new Error("Error HTTP: " + response.status);
                    }
            
                    let store = getStore();
                    setStore({ ...store, dataEstadisticas: data });
            
                } catch (e) {
                    if (e.name === 'AbortError') {
                        console.error("Error: La solicitud tomó demasiado tiempo y fue abortada.");
                    } else {
                        console.error("Error en el action getStadistics: ", e);
                    }
                }
            },
            getMapUrl: async (url) => {
                try {
                    console.log("url para ser enviada en getMapUrl action: ", url)// http://localhost:5000/

                    const token = localStorage.getItem('token');
                    const actions = getActions(); // Para acceder al logout directamente
                
                    if (!token) {
                        console.error("El token es undefined. Asegurate de que esté guardado correctamente.");
                        actions.logout(); // Llamamos al logout si no hay token
                        return;
                    }


                    const response = await fetch("https://e3digital.onrender.com/get_map_url", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ url: url }),
                    });
                    console.log("el response en seco: ", response)

                    if (response.status === 401) {
                        console.error("El token expiró o no es válido. Cerrando sesión...");
                        actions.logout(); // Logout automático
                        return;
                    }

                    // Verificar si la respuesta fue exitosa
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}`);
                    }

                    // Parsear el JSON de la respuesta
                    const data = await response.json();
                    console.log('Datos del JSON:', data);
                    // Verificar si el JSON contiene la URL
                    if (data.url) {
                        console.log('Datos del JSON:', data.url);
                        return data.url;
                    } else {
                        throw new Error("La URL no vino bien en la respuesta del backend");
                    }
                } catch (e) {
                    console.error('Error en getMapUrl:', e);
                    return null; // Devolver null explícitamente en caso de error
                }
            },

            toggleAdmin: async (email, admin) => {
                console.log("entro en toggleadmin")
                let payload = {
                    email: email,
                    admin: admin
                }
                console.log("payload preparado: ", payload)
                try {
                    let response = await fetch("https://e3digital.onrender.com/update_admin", {
                        body: JSON.stringify(payload),
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    let data = await response.json()
                    console.log("data: ", data)
                    if (data.message) {
                        console.log("Admin updated")
                        let currentTrigger = getStore().trigger
                        setStore({ ...getStore(), trigger: !currentTrigger })
                        return data
                    } else {
                        console.log("algo salio mal actualizando el estado de admin")
                    }

                } catch (e) {
                    console.error(e)
                }
            },
            getUsers: async () => {
                console.log("getUsers ejecutándose...");
                const token = localStorage.getItem('token');
                const actions = getActions(); // Para acceder al logout directamente
            
                if (!token) {
                    console.error("El token es undefined. Asegurate de que esté guardado correctamente.");
                    actions.logout(); // Llamamos al logout si no hay token
                    return;
                }
            
                try {
                    const response = await fetch("https://e3digital.onrender.com/users", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    // Si el token es inválido, se recibe un código 401
                    if (response.status === 401) {
                        console.error("El token expiró o no es válido. Cerrando sesión...");
                        actions.logout(); // Logout automático
                        return;
                    }
            
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                    }
            
                    const data = await response.json();
                    if (data.lista_usuarios) {
                        setStore({ ...getStore(), users: data.lista_usuarios });
                    }
                } catch (error) {
                    console.error("Error en getUsers:", error);
                }
            },
            setUserForEdit: (user) => {
                setStore({ ...getStore(), userForEdit: user });
            },
            deleteUser: (userId) => {
                const store = getStore();
                setStore({ ...getStore(), users: store.users.filter((user) => user.id !== userId) });
            },
            updateReport: async (payload) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://e3digital.onrender.com/recuperar_reporte', {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': apiKey
                        }
                    })

                    let data = await response.json()

                    if (data.message) {
                        return true
                    } else {
                        return false
                    }

                } catch (e) {
                    console.error(e)
                    return false
                }
            },
            goToRegister: () => {
                let store = getStore()
                setStore({ ...store, registerOk: false })
                return
            },
            goToLogin: () => {
                let store = getStore()
                setStore({ ...store, registerOk: true })
                return
            },

            exampleFunction: () => {
                console.log("hola")
                return
            },
            login: async (info) => {
                try {
                    let response = await fetch(process.env.REACT_APP_BASE_URL +'/login', {
                        method: 'POST',
                        body: JSON.stringify(info),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();
                    if (!data.access_token) {
                        throw new Error("La pifiaste con las credenciales. ", " Aca la data:", data);
                    }



                    // Guardar token en localStorage
                    localStorage.setItem('token', data.access_token);

                    // Guardar otros datos
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('admin', JSON.stringify(data.admin));
                    localStorage.setItem('dni', data.dni);
                    localStorage.setItem('url_image', data.url_image);
                    localStorage.setItem('email', data.email);

                    // Guardar en el estado global
                    setStore({
                        ...getStore(),
                        userName: data.name,
                        token: data.access_token,
                        user: {
                            username: data.name,
                            dni: data.dni,
                            admin: data.admin,
                            email: data.email,
                            url_image: data.url_image
                        }
                    });

                } catch (e) {
                    console.error(e);
                }
            },
            register: async (info) => {
                try {

                    let response = await fetch(process.env.REACT_APP_BASE_URL +'/create_user', {
                        method: "POST",
                        body: JSON.stringify(info),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    console.log("el response: ",response)
                    if(!response.ok){
                        throw new Error("Algo malió sal.")
                    }

                    let data = await response.json();
                    console.log("respuesta de intento de registro: ", data)

                    if (!data.message && data.error) {
                        return false
                    } else {
                        return true
                    }

                } catch (e) {
                    console.log(`Error al registrar el usuario ${e}`)
                    return false
                }
            },
            wrongPass: (booleano) => {
                const store = getStore()
                setStore({ ...store, wrongPass: booleano })
            },
            logout: () => {
                const store = getStore();
            
                setStore({ ...store, token: "", userName: "" });
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('admin');
            
                console.log("LogOut manual o Token vencido...");
            },
            getReportList: async () => {
                try {
                    const result = await fetch('https://e3digital.onrender.com/reportes_disponibles')
                    const data = await result.json()
                    setStore({ ...getStore(), reportes_disponibles: data.lista_reportes_disponibles, reportes_no_disponibles: data.lista_reportes_no_disponibles })
                } catch (e) {
                    console.error(e)
                }
            },
            uploadImageToCloudinary: async (imageFile) => {

                const preset_name = "j9z88xqz";
                const cloud_name = "drlqmol4c"

                const data = new FormData();
                data.append('file', imageFile);
                data.append('upload_preset', preset_name);

                try {
                    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                        method: 'POST',
                        body: data
                    });

                    if (!response.ok) {
                        throw new Error('Failed to upload image');
                    }

                    const file = await response.json();
                    const originalUrl = file.secure_url;

                    console.log("Original URL: ", originalUrl); // Verificar la URL original

                    return originalUrl;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return null;
                }
            },
            downloadReport: async (url, type) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    let response = await fetch("https://e3digital.onrender.com/obtener_reporte", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": apiKey
                        },
                        body: JSON.stringify({ "reporte_url": url, "file_type": type })
                    });

                    if (!response.ok) {
                        throw new Error(`Error al descargar el reporte: ${response.status} ${response.statusText}`);
                    }

                    let blob = await response.blob();

                    // Obtener la parte significativa de la URL y generar el nombre del archivo
                    const formattedUrl = url.split('?')[1].slice(0, 15); // Tomamos los primeros 15 caracteres de la URL después del '?'
                    let fileName = `${formattedUrl}.${type}`; // Nombre del archivo: parte de la URL + tipo de archivo

                    let downloadUrl = window.URL.createObjectURL(blob);

                    let a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = fileName; // Descargar el archivo con el nombre generado
                    document.body.appendChild(a);
                    a.click();

                    window.URL.revokeObjectURL(downloadUrl);
                    document.body.removeChild(a);
                } catch (e) {
                    console.error("Error al descargar el reporte:", e);
                }
            },
            uploadFile: async (formData) => {
                try {
                    // Hacemos el fetch a la URL del backend
                    let response = await fetch("https://e3digital.onrender.com/create_resumes", {
                        method: 'POST',
                        body: formData, // Asegurarse de que el archivo se esté enviando correctamente
                    });

                    // Verificamos que la respuesta sea OK
                    if (!response.ok) {
                        throw new Error('Error en la subida del archivo');
                    }

                    // Convertimos la respuesta a un Blob (porque es un archivo binario)
                    const blob = await response.blob();
                    console.log('Archivo subido con éxito y recibido como blob.');

                    return blob; // Devolvemos el blob al componente para que lo use en la descarga
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                    throw error;
                }
            },
            uploadExcel: async (formData) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://e3digital.onrender.com/subir_excel_total', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Authorization": apiKey
                        }
                    });
                    return response;
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                    throw error;
                }
            },

            // Action para descargar el Excel
            downloadExcel: async () => {

                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('http://localhost:5000/descargar_excel', {
                        method: 'GET',
                        headers: {
                            "Authorization": apiKey,
                        }
                    });
                    console.log("Este es el response: ", response)
                    if (!response.ok) {
                        throw new Error('Error al descargar el archivo');
                    }

                    const blob = await response.blob();  // Para crear la descarga del archivo
                    return blob;
                } catch (error) {
                    console.error('Error al descargar el archivo:', error);
                    throw error;
                }
            },

            // Action para eliminar el Excel
            deleteExcel: async () => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://e3digital.onrender.com/eliminar_excel_total', {
                        method: 'DELETE',
                        headers: {
                            "Authorization": apiKey
                        }
                    });
                    console.log("este es el response de eliminar: ", response)
                    return response;
                } catch (error) {
                    console.error('Error al eliminar el archivo:', error);
                    throw error;
                }
            },
            existencia: async () => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://e3digital.onrender.com/existencia_excel', {
                        headers: {
                            "Authorization": apiKey
                        }
                    })
                    const data = await response.json()
                    console.log("la data del action existencia es esta: ", data)
                    if (data.ok) {
                        return data.datetime
                    } else {
                        return false
                    }



                } catch (e) {
                    console.error(e)
                }
            },
            getOneResume: async (apies) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {

                    const response = await fetch('https://e3digital.onrender.com/get_one_resume', {
                        method: 'POST',
                        headers: {
                            'Authorization': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ apies }), // Enviamos el número de APIES
                    });
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `resumen_estacion_${apies}.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    } else {
                        throw new Error('Error al descargar el archivo');
                    }
                } catch (error) {
                    console.error('Error fetching resumen:', error);
                    throw error;
                }
            }

        }
    };
};

export default getState;