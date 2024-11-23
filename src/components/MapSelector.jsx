import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';

const MapSelector = () => {

    const { actions } = useContext(Context)

    const [ambito, setAmbito] = useState('');
    const [corte, setCorte] = useState('');
    const [c_mes, setCorteMes] = useState('');
    const [c_anio, setCorteAnio] = useState('');
    const [entidad, setEntidad] = useState('');
    const [distrito, setDistrito] = useState('');
    const [seccion, setSeccion] = useState('');

    const buildUrl = () => {
        return `https://cartografia.ine.mx/sige8/api/planosMapas?producto=psi&ambito=${ambito}&corte_mes=${c_mes}&corte=${c_anio}&entidad=${entidad}&distrito=${distrito}&seccion=${seccion}`;
    };

    const handleData = (e) => {
        let text = e.target.value
        let arr = text.split(" ")
        setCorte(text)
        setCorteMes(arr[0])
        setCorteAnio(arr[1])

    }
    const handleDownload = async () => {
        let url = buildUrl(); // URL inicial
        console.log('URL inicial:', url);
    
        try {
            // Obtener la URL de descarga desde el action
            let downloadUrl = await actions.getMapUrl(url);
    
            console.log('Descargando desde URL:', downloadUrl);
    
            // Extraer el nombre del archivo desde la URL
            const filename = downloadUrl.split('/').pop(); // Obtiene el último segmento de la URL
    
            // Crear un enlace temporal para forzar la descarga
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename; // Usar el nombre del archivo dinámicamente
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            console.log('Descarga iniciada con éxito');
        } catch (error) {
            console.error('Error al intentar descargar el archivo:', error);
            alert('Ocurrió un error al intentar descargar el archivo.');
        }
    };
    
    
    return (
        <div>
            <div>
                <div className="flex justify-center">
                    <div className="border w-[95%] rounded-lg">
                        <div className="grid md:grid-cols-3 md:gap-0 uppercase">
                            <div className="relative z-0 w-full group text-center">
                                <h4 className="font-bold text-white text-xs py-2 border-b bg-rose rounded-tl-lg"> Distritación </h4>
                                <div className="flex flex-wrap items-center justify-center py-3 bg-white">
                                    <select
                                        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose"
                                        value={ambito}
                                        onChange={(e) => setAmbito(e.target.value)}
                                    >
                                        <option value=""> Seleccionar distritación </option>
                                        <option value="fed">Federal</option>
                                        <option value="loc">Local</option>
                                    </select>
                                </div>
                            </div>
                            <div className="relative z-0 w-full group text-center">
                                <h4 className="font-bold text-white text-xs py-2 border-b bg-rose"> Corte </h4>
                                <div className="flex flex-wrap items-center justify-center py-3 bg-white">
                                    <select
                                        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose"
                                        value={corte}
                                        onChange={(e) => handleData(e)}
                                    >
                                        <option value=""> Seleccionar corte </option>
                                        <option value="dic 2022">dic 2022</option>
                                        <option value="nov 2023">nov 2023</option>
                                    </select>
                                </div>
                            </div>
                            <div className="relative z-0 w-full group text-center">
                                <h4 className="font-bold text-white text-xs py-2 border-b bg-rose rounded-tr-lg"> Entidad </h4>
                                <div className="flex flex-wrap items-center justify-center py-3 bg-white">
                                    <select
                                        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose"
                                        value={entidad}
                                        onChange={(e) => setEntidad(e.target.value)}
                                    >
                                        <option value=""> Seleccionar entidad </option>
                                        <option value="1">Aguascalientes</option>
                                        <option value="2">Baja California</option>
                                        <option value="3">Baja California Sur</option>
                                        <option value="4">Campeche</option>
                                        <option value="5">Coahuila</option>
                                        <option value="6">Colima</option>
                                        <option value="7">Chiapas</option>
                                        <option value="8">Chihuahua</option>
                                        <option value="9">Ciudad de México</option>
                                        <option value="10">Durango</option>
                                        <option value="11">Guanajuato</option>
                                        <option value="12">Guerrero</option>
                                        <option value="13">Hidalgo</option>
                                        <option value="14">Jalisco</option>
                                        <option value="15">México</option>
                                        <option value="16">Michoacán</option>
                                        <option value="17">Morelos</option>
                                        <option value="18">Nayarit</option>
                                        <option value="19">Nuevo León</option>
                                        <option value="20">Oaxaca</option>
                                        <option value="21">Puebla</option>
                                        <option value="22">Querétaro</option>
                                        <option value="23">Quintana Roo</option>
                                        <option value="24">San Luis Potosí</option>
                                        <option value="25">Sinaloa</option>
                                        <option value="26">Sonora</option>
                                        <option value="27">Tabasco</option>
                                        <option value="28">Tamaulipas</option>
                                        <option value="29">Tlaxcala</option>
                                        <option value="30">Veracruz</option>
                                        <option value="31">Yucatán</option>
                                        <option value="32">Zacatecas</option>
                                        {/* Aquí van las demás opciones */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <div className="border w-[95%] rounded-lg">
                        <div className="grid md:grid-cols-2 md:gap-0 uppercase">
                            <div className="relative z-0 w-full group text-center">
                                <h4 className="font-bold text-white text-xs py-2 border-b bg-rose rounded-tl-lg"> Distrito </h4>
                                <div className="flex flex-wrap items-center justify-center py-3 bg-white">
                                    <select
                                        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose"
                                        value={distrito}
                                        onChange={(e) => setDistrito(e.target.value)}
                                    >
                                            <option value=""> Seleccionar distrito </option>
                                            <option value="1">Distrito 1</option>
                                            <option value="2">Distrito 2</option>
                                            <option value="3">Distrito 3</option>
                                            <option value="4">Distrito 4</option>
                                            <option value="5">Distrito 5</option>
                                            <option value="6">Distrito 6</option>
                                            <option value="7">Distrito 7</option>
                                            <option value="8">Distrito 8</option>
                                            <option value="9">Distrito 9</option>
                                            <option value="10">Distrito 10</option>
                                            <option value="11">Distrito 11</option>
                                            <option value="12">Distrito 12</option>
                                            <option value="13">Distrito 13</option>
                                            <option value="14">Distrito 14</option>
                                            <option value="15">Distrito 15</option>
                                            <option value="16">Distrito 16</option>
                                            <option value="17">Distrito 17</option>
                                            <option value="18">Distrito 18</option>
                                            <option value="19">Distrito 19</option>
                                            <option value="20">Distrito 20</option>
                                            <option value="21">Distrito 21</option>
                                            <option value="22">Distrito 22</option>
                                            <option value="23">Distrito 23</option>
                                            <option value="24">Distrito 24</option>
                                            <option value="25">Distrito 25</option>
                                            <option value="26">Distrito 26</option>
                                    </select>
                                </div>
                            </div>
                            <div className="relative z-0 w-full group text-center">
                                <h4 className="font-bold text-white text-xs py-2 border-b bg-rose rounded-tr-lg"> Sección </h4>
                                <div className="flex flex-wrap items-center justify-center py-3 bg-white">
                                    <select
                                        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose"
                                        value={seccion}
                                        onChange={(e) => setSeccion(e.target.value)}
                                    >
                                            <option value=""> Seleccionar sección </option>
                                            <option value="1761">1761</option>
                                            <option value="1762">1762</option>
                                            <option value="1763">1763</option>
                                            <option value="1764">1764</option>
                                            <option value="1765">1765</option>
                                            <option value="1766">1766</option>
                                            <option value="1767">1767</option>
                                            <option value="1768">1768</option>
                                            <option value="1769">1769</option>
                                            <option value="1770">1770</option>
                                            <option value="1771">1771</option>
                                            <option value="1772">1772</option>
                                            <option value="1773">1773</option>
                                            <option value="1774">1774</option>
                                            <option value="1775">1775</option>
                                            <option value="1776">1776</option>
                                            <option value="1777">1777</option>
                                            <option value="1778">1778</option>
                                            <option value="1779">1779</option>
                                            <option value="1780">1780</option>
                                            <option value="1781">1781</option>
                                            <option value="1782">1782</option>
                                            <option value="1783">1783</option>
                                            <option value="1784">1784</option>
                                            <option value="1785">1785</option>
                                            <option value="1786">1786</option>
                                            <option value="1787">1787</option>
                                            <option value="1788">1788</option>
                                            <option value="1789">1789</option>
                                            <option value="1790">1790</option>
                                            <option value="1791">1791</option>
                                            <option value="1792">1792</option>
                                            <option value="1793">1793</option>
                                            <option value="1794">1794</option>
                                            <option value="1795">1795</option>
                                            <option value="1796">1796</option>
                                            <option value="1797">1797</option>
                                            <option value="1798">1798</option>
                                            <option value="1799">1799</option>
                                            <option value="1800">1800</option>
                                            <option value="1801">1801</option>
                                            <option value="1802">1802</option>
                                            <option value="1803">1803</option>
                                            <option value="1804">1804</option>
                                            <option value="1805">1805</option>
                                            <option value="1806">1806</option>
                                            <option value="1807">1807</option>
                                            <option value="1808">1808</option>
                                            <option value="1809">1809</option>
                                            <option value="1810">1810</option>
                                            <option value="1811">1811</option>
                                            <option value="1812">1812</option>
                                            <option value="1813">1813</option>
                                            <option value="1814">1814</option>
                                            <option value="1815">1815</option>
                                            <option value="1816">1816</option>
                                            <option value="1817">1817</option>
                                            <option value="1818">1818</option>
                                            <option value="1819">1819</option>
                                            <option value="1820">1820</option>
                                            <option value="1821">1821</option>
                                            <option value="1822">1822</option>
                                            <option value="1823">1823</option>
                                            <option value="1824">1824</option>
                                            <option value="1825">1825</option>
                                            <option value="1826">1826</option>
                                            <option value="1827">1827</option>
                                            <option value="1828">1828</option>
                                            <option value="1829">1829</option>
                                            <option value="1830">1830</option>
                                            <option value="1831">1831</option>
                                            <option value="1832">1832</option>
                                            <option value="1833">1833</option>
                                            <option value="1834">1834</option>
                                            <option value="1835">1835</option>
                                            <option value="1836">1836</option>
                                            <option value="1837">1837</option>
                                            <option value="1838">1838</option>
                                            <option value="1839">1839</option>
                                            <option value="1840">1840</option>
                                            <option value="1841">1841</option>
                                            <option value="1842">1842</option>
                                            <option value="1843">1843</option>
                                            <option value="1844">1844</option>
                                            <option value="1845">1845</option>
                                            <option value="1846">1846</option>
                                            <option value="1847">1847</option>
                                            <option value="1848">1848</option>
                                            <option value="1849">1849</option>
                                            <option value="1850">1850</option>
                                            <option value="1851">1851</option>
                                            <option value="1853">1853</option>
                                            <option value="1859">1859</option>
                                            <option value="1860">1860</option>
                                            <option value="1861">1861</option>
                                            <option value="1862">1862</option>
                                            <option value="1863">1863</option>
                                            <option value="1864">1864</option>
                                            <option value="1865">1865</option>
                                            <option value="1866">1866</option>
                                            <option value="1867">1867</option>
                                            <option value="1868">1868</option>
                                            <option value="1869">1869</option>
                                            <option value="1870">1870</option>
                                            <option value="1871">1871</option>
                                            <option value="1872">1872</option>
                                            <option value="1873">1873</option>
                                            <option value="1874">1874</option>
                                            <option value="1875">1875</option>
                                            <option value="1876">1876</option>
                                            <option value="1877">1877</option>
                                            <option value="1878">1878</option>
                                            <option value="1879">1879</option>
                                            <option value="1880">1880</option>
                                            <option value="1881">1881</option>
                                            <option value="1882">1882</option>
                                            <option value="1883">1883</option>
                                            <option value="1884">1884</option>
                                            <option value="1885">1885</option>
                                            <option value="1886">1886</option>
                                            <option value="1897">1897</option>
                                            <option value="1898">1898</option>
                                            <option value="1899">1899</option>
                                            <option value="1900">1900</option>
                                            <option value="1901">1901</option>
                                            <option value="1912">1912</option>
                                            <option value="1913">1913</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-2" style={{ marginTop: '10px' }}>
                <button
                    type="button"
                    onClick={handleDownload}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Descargar
                </button>
            </div>
        </div>
    );
};

export default MapSelector;
