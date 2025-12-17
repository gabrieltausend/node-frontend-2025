const ChamadoShow = ({ chamado }) => {
    const Usuarios_id = chamado.Usuarios_id;
    const texto = chamado.texto;
    const estado = chamado.estado;
    const hasImagem = chamado.url_imagem ? true : false;
    return (
        <div className='m-2'>
            <div className='my-2'>
                <label htmlFor="id-input-id" className='form-label'>Usuarios_id</label>
                <input className="form-control" type="text" id="id-input-id" value={Usuarios_id} readOnly />
            </div>
            <div className='my-2'>
                <label htmlFor="id-input-texto" className='form-label'>Texto</label>
                <input className="form-control" type="text" id="id-input-texto" value={texto} readOnly />
            </div>
            <div className='my-2'>
                <label htmlFor="id-input-estado" className='form-label'>Estado</label>
                {estado === "a" && <input className="form-control" type="text" id="id-input-texto" value="Aberto" readOnly />}
                {estado === "f" && <input className="form-control" type="text" id="id-input-texto" value="Fechado" readOnly />}
            </div>
        </div>
    )
}
export default ChamadoShow