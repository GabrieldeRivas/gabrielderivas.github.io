import React, { Fragment, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../css/mixer.css';

const Mixer = () => {

    const [paleta, editarPaleta] = useState([]);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    };

    const combinarColores = (id_area, id_area_a, id_area_b) => {
        setTimeout(() => {
            var area1 = document.getElementById(id_area_a);
            var area2 = document.getElementById(id_area_b);
            
            if (area1 && area2) {
                var background1 = window.getComputedStyle(area1).getPropertyValue("background-color").slice(4, -1);
                var background2 = window.getComputedStyle(area2).getPropertyValue("background-color").slice(4, -1);
                const [red, green, blue] = background1.split(",").map(value => parseInt(value.trim(), 10));
                const [red2, green2, blue2] = background2.split(",").map(value => parseInt(value.trim(), 10));
                var redMix = Math.ceil((red + red2) / 2);
                var greenMix = Math.ceil((green + green2) / 2);
                var blueMix = Math.ceil((blue + blue2) / 2);
                var coloresRGB = [redMix, greenMix, blueMix];
                var combinacionRGB = 'rgb(' + coloresRGB[0] + ', ' + coloresRGB[1] + ', ' + coloresRGB[2] + ')';
                document.getElementById(id_area).style.background = combinacionRGB;
                setTimeout(() => {
                    const elemento = document.querySelector(`#${id_area}`);
                    escribirColorFondoEnParrafo(elemento);
                }, 100)
            }
        }, 500)      
    }

    const recibirColor = async(id_area, id_area2, id_area_mix) => {
        const url = 'http://colormind.io/api/';
        const data = {
        model: 'default',
        input: ['N', 'N', 'N', 'N', 'N']
        };

        fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            const random = getRandomInt(0, 5);
            const red = (result.result[random][0]);
            const green = (result.result[random][1]);
            const blue = (result.result[random][2]);
            var colorRGB = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
            document.getElementById(id_area).style.background = colorRGB;
            setTimeout(() => {
                combinarColores(id_area_mix, id_area, id_area2);
            }, 500)
            setTimeout(() => {
                const elemento = document.querySelector(`#${id_area}`);
                escribirColorFondoEnParrafo(elemento, colorRGB);
            }, 100)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const escribirColorFondoEnParrafo = (elemento) => {
        setTimeout(() => {
            var colorFondo = window.getComputedStyle(elemento).getPropertyValue('background-color');
            var parrafoExistente = elemento.children[0];
            if (parrafoExistente) {
                parrafoExistente.textContent = colorFondo;
            } else {
            var parrafoNuevo = document.createElement('p');
                parrafoNuevo.textContent = colorFondo;
            }
        }, 1000)   
    }

    const generarPaleta = async () => {
        let paletas = document.querySelector("#paletas");
        let colores = document.querySelector("#colores-rgb");
        const url = 'http://colormind.io/api/';
        const data = {
        model: 'default',
        input: ['N', 'N', 'N', 'N', 'N']
        };

        await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            paletas.innerHTML = paletas.innerHTML +
            `
            <div className="color-area" id="paleta-1">
            </div>
            <div className="color-area" id="paleta-2">
            </div>
            <div className="color-area" id="paleta-3">
            </div>
            <div className="color-area" id="paleta-4">
            </div>
            <div className="color-area" id="paleta-5">
            </div>
            `;

            colores.innerHTML = 
            `
            <ul class="lista-mobile">
                <li>rgb(${result.result[0]})</li>
                <li>rgb(${result.result[1]})</li>
                <li>rgb(${result.result[2]})</li>
                <li>rgb(${result.result[3]})</li>
                <li>rgb(${result.result[4]})</li>
            </ul>
            `;
            document.getElementById("paleta-1").style.background = `rgb(${result.result[0]})`;
            document.getElementById("paleta-2").style.background = `rgb(${result.result[1]})`;
            document.getElementById("paleta-3").style.background = `rgb(${result.result[2]})`;
            document.getElementById("paleta-4").style.background = `rgb(${result.result[3]})`;
            document.getElementById("paleta-5").style.background = `rgb(${result.result[4]})`;
            const paletaAGuardar = result.result
            editarPaleta(paletaAGuardar);
            //localStorage.setItem('paleta', JSON.stringify(paleta))
        })
    }

    const agregarAFavoritas = () => {
        if(localStorage.getItem('paleta') == null || localStorage.getItem('paleta') == "") {
            localStorage.setItem('paleta', JSON.stringify(paleta))
        } else {
            localStorage.setItem('paleta', localStorage.getItem('paleta') + JSON.stringify(paleta))
        }
        recargarPaletasFavoritas()
    }

    const borrarPaletas = () => {
        localStorage.setItem('paleta', "");
        recargarPaletasFavoritas()
    }

    const recargarPaletasFavoritas = () => {
        const favoritas = document.getElementById("favs")
        const paletasGuardadas = localStorage.getItem("paleta")
        let paletasAMostrar = ``;
        for(let elem of paletasGuardadas.split("[")) {
            paletasAMostrar = `${elem.slice(0, elem.length-2)}<br>${paletasAMostrar}`
        }
        favoritas.innerHTML = `
            ${paletasAMostrar}
        `
    }

    useEffect(() => {
        document.querySelectorAll('.color-area').forEach((elemento) => {
            escribirColorFondoEnParrafo(elemento);
        })
        generarPaleta()
        recargarPaletasFavoritas()
    }, [])

    return (
        <Fragment>
            <Container className='mixer-container'>
                <p id="ancla-random" className='ancla'></p>
                <h1 className='title' id='title-random'>Random Mixer</h1>
                <p className='info'>Generates two random colors and seamlessly blends them into a single harmonious hue.</p>       
                <Row className='row-letters'>
                    <Col xs={12} md={4}>
                        Color 1
                    </Col>
                    <Col xs={12} md={4}>
                        Color 2
                    </Col>
                    <Col xs={12} md={4}>
                        Mix
                    </Col>
                </Row>
                <Row>
                    <Col className='invisible-row'>

                    </Col>
                    <Col xs={12} sm={5} md={3}>
                        <div className="color-area" id="area-a">
                            <p className='rgb-value' id="p-a"></p>
                        </div>
                    </Col>
                    <Col xs={12} sm={2} md={1} className='col-operators'>
                        +
                    </Col>
                    <Col xs={12} sm={5} md={3}>
                        <div className="color-area" id="area-b">
                            <p className='rgb-value' id="p-b"></p>
                        </div>
                    </Col>
                    <Col xs={12} md={1} className='col-operators'>
                        =
                    </Col>
                    <Col xs={12} md={3}>
                        <div className="color-area" id="area-c">
                            <p className='rgb-value' id="p-c"></p>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <Button variant="outline-dark" className='mixer-btn' id="btn-1" onClick={() => recibirColor("area-a", "area-b", "area-c")}>Randomize</Button>{' '}
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Button variant="outline-dark" className='mixer-btn' id="btn-2" onClick={() => recibirColor("area-b", "area-a", "area-c")}>Randomize</Button>{' '}
                    </Col>
                </Row>
                <p id="ancla-palette" className='ancla'></p>
                <h3 className='title title-random' id="title-palette">Random Palette</h3>
                <p className='info info-palette'>A dynamic color palette generator that presents you with five captivating and randomly selected hues.</p>
                <div id="div-paletas">
                    <div id="paletas"></div>
                    <div id="colores-rgb">

                    </div>
                </div>
                <div id="botones">
                    <Button variant="outline-dark" id='btn-palette' onClick={() => generarPaleta()}>New palette</Button>
                    <Button variant="outline-dark" id='btn-love' onClick={() => agregarAFavoritas()}>♡</Button>
                </div>
                <h3 id="title-favs">Your <span id="heart">♡</span> palettes</h3>
                <div id="favs">
                    <h3 id=''>Your favorite palettes</h3>
                </div>
                <Button variant="outline-dark" id="borrar" onClick={() => borrarPaletas()}>Borrar paletas</Button>
            </Container>
        </Fragment>
    );
}

export default Mixer;