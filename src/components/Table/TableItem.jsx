import classes from './TableItem.module.css'

const TableItem = ({brand,id,product,price}) => {

  return (
       <div className={classes.items}>
        <section className={classes.col}>
            <p className={classes.brand}>{brand ? brand : '_______'}</p>
        </section>
        <section className={classes.col}>
            <p>{id}</p>
        </section>
        <section className={classes.col}>
            <p>{price}</p>
        </section>
        <section className={classes.col}>
            <p className={classes.name}>{product}</p>
        </section>
      </div>

  )
}

export default TableItem
