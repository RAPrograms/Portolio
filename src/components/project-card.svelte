<a href="">
    <div>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        <img src="/icons/right-line-arrow.svg" alt=""> 
    </div>

    <!--<img src="/featured_projects/one.png" alt="">-->
    
</a>

<style lang="scss">
    a{
        background: linear-gradient(197deg,rgba(8, 57, 38, 1) 30%, rgba(5, 150, 105, 1) 68%, rgba(52, 211, 153, 1) 90%, rgba(249, 215, 147, 1) 100%);
        aspect-ratio: 16 / 10;
        display: flex;
        flex-direction: column;
        border-radius: 25px;
        overflow: hidden;
        position: relative;

        
        display: block;
        height: 500px;

        
        & > div{
            display: flex;
            gap: 10px;
            padding: 30px 50px;
            font-size: 200%;
            text-align: left;

            & > span{
                flex-grow: 1;
            }

            & > img{
                height: 100%;
            }
        }

    }
</style>