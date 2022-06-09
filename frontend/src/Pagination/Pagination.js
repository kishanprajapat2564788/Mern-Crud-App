import React from 'react';
import { CardFooter, Pagination, PaginationItem, PaginationLink } from "reactstrap";


const PaginationNode = (props) => {
    return (
      <>
        <PaginationItem disabled={props.disabled} className={(props.currentPage===1&&props.num==="Next")||(props.num==="Previous"&&props.totalPage<=props.currentPage)?"disabled":null}>
          <PaginationLink onClick={(e) =>{props.triggerFun()}}>
            {/*   */}
            <i className={props.icon} />
            <span className="sr-only">{props.num}</span>
          </PaginationLink>
        </PaginationItem>
      </>
    )
  }
  
  const PaginationPage = (props) => {
    return (
      <>
        {props.num&&!(props.totalPage<props.num) ? <PaginationItem disabled={props.disabled} className={props.url ? (props.active ? 'active' : null) : (props.active ? 'active disable' : 'disable')}>
          <PaginationLink onClick={props.currentPage !== props.num ? (e) => props.triggerFun() : ()=>{}}>
            {/* onClick={(e) =>{props.triggerFun()}} */}
            {props.num}
          </PaginationLink>
        </PaginationItem> : null}
      </>
    )
  }

const NewPagination = (props) => {

    const nextPage = () => {
        props.setAnyDataInPagination(
          props.stateTotalData.slice(
            (props.pagination.currentPage + 1) * props.pageSize - props.pageSize,
            (props.pagination.currentPage + 1) * props.pageSize
          )
        );
        let n = props.pagination;
        n["currentPage"] = n["currentPage"] + 1;
        n["previousPage"] = n.currentPage;
        // console.log('Pagination---->',n);
        props.setPagination(n);
      };
      
      const firstPage = () => {
        props.setAnyDataInPagination(props.stateTotalData.slice(1 * props.pageSize - props.pageSize, 1 * props.pageSize));
        //console.log(props.pagination);
        let n = props.pagination;
        n["currentPage"] = 1;
        n["previousPage"] = null;
        // console.log('Pagination---->',n);
        props.setPagination(n);
      };
    
      const lastPage = () => {
        props.setAnyDataInPagination(
          props.stateTotalData.slice(
            props.pagination.totalPage * props.pageSize - props.pageSize,
            props.pagination.totalPage * props.pageSize
          )
        );
        let n = props.pagination;
        n["currentPage"] = n.totalPage;
        n["previousPage"] = n.totalPage - 1;
        // console.log('Pagination---->',n);
        props.setPagination(n);
      };
    
      const previousPage = () => {
        if (props.pagination.currentPage !== 1) {
          props.setAnyDataInPagination(
            props.stateTotalData.slice(
              (props.pagination.currentPage - 1) * props.pageSize - props.pageSize,
              (props.pagination.currentPage - 1) * props.pageSize
            )
          );
          let n = props.pagination;
          n["currentPage"] = n["currentPage"] - 1;
          if (n["currentPage"] === 1) {
            n["previousPage"] = null;
          } else {
            n["previousPage"] = n.currentPage;
          }
          // console.log('Pagination---->',n);
          props.setPagination(n);
        }
      };
  return (
    <>
      {props.pagination ? <CardFooter className="py-4">
        <nav aria-label="...">
          <Pagination className="props.pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
            <PaginationNode disabled={false} num={'Next'} totalPage={props.pagination.totalPage} currentPage={props.pagination.currentPage} active={true} triggerFun={firstPage} icon={'fa fa-angle-double-left'} />
            <PaginationNode disabled={false} num={'Next'} totalPage={props.pagination.totalPage} currentPage={props.pagination.currentPage} active={true} triggerFun={previousPage} icon={'fa fa-angle-left'} />
            <PaginationPage disabled={false} active={false} totalPage={props.pagination.totalPage} num={parseInt(props.pagination.currentPage-1)} currentPage={props.pagination.currentPage} triggerFun={previousPage} />
            <PaginationPage disabled={false} active={true} totalPage={props.pagination.totalPage} num={parseInt(props.pagination.currentPage)} currentPage={props.pagination.currentPage} triggerFun={nextPage} />
            <PaginationPage disabled={false} active={false} totalPage={props.pagination.totalPage} num={parseInt(props.pagination.currentPage+1)} currentPage={props.pagination.currentPage} triggerFun={nextPage} />
            <PaginationNode disabled={false} num={'Previous'} totalPage={props.pagination.totalPage} currentPage={props.pagination.currentPage} triggerFun={nextPage} icon={'fa fa-angle-right'} />
            <PaginationNode disabled={false} num={'Previous'} totalPage={props.pagination.totalPage} currentPage={props.pagination.currentPage} triggerFun={lastPage} icon={'fa fa-angle-double-right'} />
          </Pagination>
        </nav>
      </CardFooter> : null}
    </>
  )
}

export default NewPagination;
