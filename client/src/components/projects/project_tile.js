import {
    Collapse, 
    Nav, NavItem, NavLink, 
    UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
    Input, InputGroup, InputGroupText,
    Button, Row, Col, Form, Container, Label
} from "reactstrap";

const ProjectTile = ({ index, project }) => { 

    return <Col xs='12' sm='4' key={index} style={{marginBottom: '30px'}}>
        <Container>
            <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: '160px', backgroundColor: 'inherit', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
                <div style={{position: 'absolute', top: '170px', left: 0, right: 0}}>
                    Loading image...
                </div>
                <img src={project.images[0]} onError={(e) => e.target.src = project.images[0]} style={{
                        position: 'absolute', left: 0, right: 0, width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: '160px',
                        marginLeft: 'auto', marginRight: 'auto'
                    }} 
                />
            </div>
            {
                project.title.length <= 35
                ? <h6 style={{fontWeight: 'bold', textAlign: 'left', marginTop: '10px'}}>
                    {project.title}
                </h6>
                : <h6 style={{fontWeight: 'bold', textAlign: 'left', marginTop: '10px'}}>
                    {project.title.substring(0, 35)}...
                </h6>
            }
            {
                project.category.length <= 35
                ? <h6 style={{fontWeight: 400, textAlign: 'left', marginTop: '10px', fontSize: '12px'}}>
                    {project.category}
                </h6>
                : <h6 style={{fontWeight: 400, textAlign: 'left', marginTop: '10px', fontSize: '12px'}}>
                    {project.category.substring(0, 35)}...
                </h6>
            }
            {
                project.description.length <= 119
                ? <p style={{textAlign: 'left', fontWeight: 200}}>
                    {project.description}
                </p>
                : <p style={{textAlign: 'left', fontWeight: 200}}>
                    {project.description.substring(0, 119)}...
                </p>
            }
            {
                project.technologies.length <= 35
                ? <h6 style={{textAlign: 'left', marginTop: '10px', fontWeight: 400}}>
                    {project.technologies}
                </h6>
                : <h6 style={{textAlign: 'left', marginTop: '10px', fontWeight: 400}}>
                    {project.technologies.substring(0, 35)}...
                </h6>
            }
            <h6 style={{textAlign: 'right', cursor: 'pointer', fontWeight: 600}} 
                onClick={() => window.location.href = '/projects/' + project.title}
            >
                Read more
            </h6>
        </Container>
    </Col>;

}

export default ProjectTile;
