//////////////////////////////////////////////////
///                                            ///
///  PARAMETRES DE MISE EN FORME DU GRAPHIQUE  ///
///                                            ///
//////////////////////////////////////////////////
        
    // marges et limites taille du container (point d'arrêt) :
        const scrMinWidth = 360 // largeur min graphContainer
        const scrWBp = 660 // point d'arrêt largeur de fenêtre (doit être cohérent avec le .css)
        const scrMaxWidth = 1980 // largeur max graphContainer
        const scrMinHeight = 400 // hauteur min graphContainer
        const scrHBp = 500 // point d'arrêt hauteur de fenêtre (doit être cohérent avec le .css)
        const scrMaxHeight = 800 // hauteur max graphContainer
    // marges du container svg :
        const svgMarginLeftMin = 60 // petite marge 
        const svgMarginRightMin = 50 // petite marge 
        const svgMarginLeftMax = 80 // grande marge 
        const svgMarginRightMax = 80 // grande marge 
        const svgMarginTopMin = 15 // petite marge 
        const svgMarginBottomMin = 35 // petite marge 
        const svgMarginTopMax = 20 // grande marge 
        const svgMarginBottomMax = 40 // grande marge 
        let svgMargin = { top:svgMarginTopMax, right:svgMarginRightMax, bottom:svgMarginBottomMax, left:svgMarginLeftMax }
        let svgContainerHeight = 300

    // intervalle de temps du graphique :
        const tMin = d3.min(Object.values(dataSet.monthly).flat(1), function(d) { return d3.timeParse("%Y-%m")(d.date) })
        const tMax = d3.max(Object.values(dataSet.monthly).flat(1), function(d) { return d3.timeParse("%Y-%m")(d.date) })
        const month = 2629800000 // mois en ms

    // paramètre des infobulles
        const tooltipWidthMin = 70 // largeur petite infobulle
        const tooltipWidthMax = 85 // largeur grande infobulle
        let tooltipWidth = tooltipWidthMax
        const flecheMin = 10
        const flecheMax = 20
        let fleche = flecheMax     // longueur de la flèche
        const baseMin = 5
        const baseMax = 7
        let base = baseMax         // 1/2 largeur de la flèche à la base
        const tooltipRadiusMin = 5
        const tooltipRadiusMax = 8
        let tooltipRadius = tooltipRadiusMax   // rayon
        const tooltipWPadMin = 7 // padding left/right du tooltip
        const tooltipWPadMax = 10 // padding left/right du tooltip
        let tooltipWPad = tooltipWPadMax // padding left/right du tooltip
        const tooltipHPadMin = 4 // padding top/bottom du tooltip
        const tooltipHPadMax = 5 // padding top/bottom du tooltip
        let tooltipHPad = tooltipHPadMax // padding top/bottom du tooltip
        const tooltipFontSizeMin = 10 
        const tooltipFontSizeMax = 12 
        let tooltipFontSize = tooltipFontSizeMax 
        const tooltipLineRatio = 1.4 // rapport interligne / hauteur de police
        let tooltipInterLine = tooltipFontSize*tooltipLineRatio // interlignes

        const rBulletMin = 3
        const rBulletMax = 4
        let rBullet = rBulletMax

    // nombre de graduations sur les axes x et y:
        const nxticksMin = 5
        const nxticksMax = 8
        const nyticksMin = 5
        const nyticksMax = 10
        let nxticks = nxticksMax
        let nyticks = nyticksMax

    // marges hautes et basses entre le min et le max de la courbe et les limites de la zone de tracé :
        let vMargin = 0.05 // x% de l'amplitude de la courbe (utilisé sans yScaleGenerator)

    // paramètres zoom
        const hCursorMin = 30
        const hCursorMax = 40
        const ratioCursorOff = 0.8 // rapport de taille entre curseur "zoom off" et curseur "zoom on"
        let hCursor = null 
        let zoomMode = null             // .runnerContainer = pointerdown : devient true (zoom activé) / .zoomContainer = pointerdown : redevient false (validation sélection zoom)
        let zoomProgress = null         // .runnerContainer = pointerdown : devient true (zoom activé) / .graphContainer = pointerleave/up : redevient false (pour zoomer le runner opposé)
        let dezoomProgress = null       // autorise le lancement (si false) et controle la fonction asynchrone de dezoomage (poursuite des boucles async si true) 
        let traceInProgress = null      // passe à true en traçage automatique des courbes après sélection zoom, pour éviter de relancer une 2ème fois
        let pointerX = null             // coordonnée du pointeur (souris, doigt,...)
        let pointerX0 = null            // coordonnée mémorisée du pointeur
        let runnerX = null              // coordonnée du runner
        let move = null                 //left ou right (id du curseur activé)

        const touchDevice = ("ontouchstart" in window)        // détection d'appareil tactile (pour que les infobulles soient décalées / doigt)

    // paramètres des animations dezoom/zoom (permet de régler leur vitesse)
        const dezoomTimeStep = month*12 // pas de temps mini en ms pour le dezoomage
        const zoomMaxStep = 30 // nombre maxi d'itérations pour le zoom après validation

    // paramètres des infobulles des explications zoom :

        const zTtW1Min = 30
        const zTtW2Min = 50
        const zTtHMin =  50
        const zTtflecheMin = 15 
        const zTtbaseMin = 5
        const zTtRadiusMin = 3 
        const zTtPadMin = 5

        const zTtW1Max = 40
        const zTtW2Max = 60
        const zTtHMax =  70
        const zTtflecheMax = 20 
        const zTtbaseMax = 7
        const zTtRadiusMax = 5 
        const zTtPadMax = 10

        let zTtW1 = null 
        let zTtW2   = null
        let zTtH   = null 
        let zTtfleche = null 
        let zTtbase  = null 
        let zTtRadius = null
        let zTtPad = null

        let zTtorient = null
        let zTtLineCount = null

    // paramètres slider
        const rRunnerMin = 14 // rayon mini du runner (bouton)
        const rRunnerMax = 20 // rayon maxi du runner (bouton)
        let rRunner = rRunnerMax

        let svgSliderWidth = null
        const nnticksMin = 4        // nombre de ticks sur le slider
        const nnticksMax = 4
        let nnticks = null          // nombre de graduations sur l' axes N
        const Nmax = 120            // taille de la fenêtre glissante en mois 
        let NMode = false           // devient true quand on active le slider pour faire varier N. Permet de controler les events

    // palette de couleurs des flèches de zoom et slider :
        const panelColor = { 
            "stroke":"#444",                // contours barre du slider
            "backFill":"#ccc",              // fond barre de slider
            "hoverBackFill":"#ddd",         // fond barre de slider en hover
            "fill":"rgb(100, 200, 190)",    // fond flèches de zoom et bouton de slider
            "hoverFill":"rgb(0, 160, 140)", // fond flèches de zoom et bouton de slider en hover
            "dragFill":"rgb(20, 255, 230)",  // fond flèches de zoom et bouton de slider en dragage
            "dragStop":"rgb(200, 70, 70)"
    }

    // paramètre légende
        const dLegendMin = 8
        const dLegendMax = 12
        let dLegend = null

        let rangeN = null
        let rangeX = null
        let rangeY = null

        const tz = -120 // décalage horaire en minutes pour conversions date en yy-mm. Doit être compris entre -120 et -40319.

///////////////////////////////
///                         ///
///  FONCTIONS UTILITAIRES  ///
///                         ///
///////////////////////////////

    // === paramètres graphiques liés à la dimension de la fenêtre ===

    let winDim = () => {
        // retourne les dimensions de fenêtre :
        return {
            "scrW": window.innerWidth,
            "scrH": window.innerHeight
        }
    }

    function graphDisplay() {
        // retourne les paramètres du graphique pour adaptation à la taille de l'écran 
        // et positionne les marges et graph en fonction des marges
        let w = winDim().scrW
        let h = winDim().scrH

        if (w <= scrMinWidth) { w = scrMinWidth } 
        if (w >= scrMaxWidth) { w = scrMaxWidth } 
        if (h <= scrMinHeight) { h = scrMinHeight } 
        if (h >= scrMaxHeight) { h = scrMaxHeight } 

        if (w <= scrWBp) { 
            svgMargin.left = svgMarginLeftMin
            svgMargin.right = svgMarginRightMin
            svgMargin.top = svgMarginTopMin
            svgMargin.bottom = svgMarginBottomMin
            svgSliderWidth = w
            svgContainerHeight = h -233
            tooltipWidth = tooltipWidthMin
            fleche = flecheMin
            base = baseMin
            tooltipRadius = tooltipRadiusMin
            tooltipWPad = tooltipWPadMin
            tooltipHPad = tooltipHPadMin
            tooltipFontSize = tooltipFontSizeMin
            tooltipInterLine = tooltipFontSize*tooltipLineRatio
            rBullet = rBulletMin
            hCursor = hCursorMin
            nxticks = nxticksMin
            nnticks = nnticksMin
            rangeN = w - svgMargin.left - svgMargin.right -rRunner/2
            zTtW1 = zTtW1Min 
            zTtW2 = zTtW2Min 
            zTtH   = zTtHMin   
            zTtfleche = zTtflecheMin  
            zTtbase  = zTtbaseMin   
            zTtRadius = zTtRadiusMin
            zTtPad = zTtPadMin
            rRunner = rRunnerMin
            dLegend = dLegendMin
        } else {
            svgMargin.left = svgMarginLeftMax
            svgMargin.right = svgMarginRightMax
            svgMargin.top = svgMarginTopMax
            svgMargin.bottom = svgMarginBottomMax
            svgSliderWidth = w/2 + rRunner*2
            svgContainerHeight = h -189
            tooltipWidth = tooltipWidthMax
            fleche = flecheMax
            base = baseMax
            tooltipRadius = tooltipRadiusMax
            tooltipWPad = tooltipWPadMax
            tooltipHPad = tooltipHPadMax
            tooltipFontSize = tooltipFontSizeMax 
            tooltipInterLine = tooltipFontSize*tooltipLineRatio
            rBullet = rBulletMax
            hCursor = hCursorMax
            nxticks = nxticksMax
            nnticks = nnticksMax
            rangeN = w/2 - svgMargin.left - rRunner/4
            zTtW1 = zTtW1Max 
            zTtW2 = zTtW2Max 
            zTtH   = zTtHMax   
            zTtfleche = zTtflecheMax  
            zTtbase  = zTtbaseMax   
            zTtRadius = zTtRadiusMax
            zTtPad = zTtPadMax
            rRunner = rRunnerMax
            dLegend = dLegendMax
        }

        if (h <= scrHBp) { 
            nyticks = nyticksMin
        } else {
            nyticks = nyticksMax
        }

        rangeX = w-svgMargin.left-svgMargin.right
        rangeY = svgContainerHeight - svgMargin.top-svgMargin.bottom
        svgContainer.attr("height", svgContainerHeight)
        traceContainer.attr("transform", `translate( ${svgMargin.left}, ${svgMargin.top} )`)
        axesContainer.attr("transform", `translate( ${svgMargin.left}, ${svgMargin.top} )`)
        zoomContainer.attr("transform", `translate( ${ svgMargin.left } , ${svgMargin.top + rangeY} )` ) 
        hoverContainer.attr("transform", `translate( ${svgMargin.left}, ${svgMargin.top} )`)
        sliderContainer.select("#svgSlider")
            .attr("width", svgSliderWidth).attr("height", rRunner*4.0)
        sliderContainer.select("#slideBloc").attr("transform", `translate( ${rRunner/4+svgMargin.left}, ${rRunner*2} )`)
        touchZone.attr("x", -svgMargin.left).attr("y", -rangeY-titreContainer.style("height").slice(0,-2))
            .attr("width", w).attr("height", rangeY+titreContainer.style("height").slice(0,-2)*1.5)
    }

    // séparateur de milliers :
    const sepMilliers = (k) => {
        if (typeof(k) =="number") { k = k.toFixed(0).toString() }
        let K = ""
        for (let i=0;i<k.length;i++) { 
            K +=k[i]
            if (((k.length -1-i)%3 == 0) && (k.length -1 !=i)){ K += " "}
        }
        return K 
    }

    // conversion d'une date au format yyyy-mm (en tenant compte du fuseau horaire pour ne pas décaler d'un mois)
    function convertDate(date) {
        // Manière "normale" de faire, qui marche avec firefox mais pas avec chrome :
        //      let newDate = new Date(date.getTime()-date.getTimezoneOffset()*60000) // donne la date UTC à 00h00m00s 
        // Manière "débugguée" de faire qui fonctionne avec firefoxf et chrome 
        //      pour tz compris entre -120 et -40319 (minutes):
        let newDate = new Date(date.getTime()-tz*60000) // donne la date UTC à 00h00m00s 
        return newDate.toISOString().substring(0,7)
    }

    // fonction retournant l'arrondi d'une date au 1er du mois 00h00m00s
    function roundDate(date) {
        const datePlusHalfMonth = new Date(date.getTime() + month/2)
        return new Date(Math.max(tMin, d3.timeParse("%Y-%m")(convertDate(datePlusHalfMonth))))
    }

    // extrait {date:xx-xx, key:y} pour un temps t et un dataset (utile pour hover)
    function extractFromDataSet(date, dataset) {
        const extract = dataset.filter( (x) => x.date === convertDate(date)) 
        if (extract.length === 0) {
            return undefined
        } else {
            return extract[0]
        }
    }
        
    // retourne la valeur sous la forme  + ou - [t]°C et - si valeur NaN 
    function temperatureFormat(t) {
        if ( isNaN(t)) {
            return "-"
        } else if (t >= 0) {
            return "+ " + `${Math.abs(t.toFixed(2))}` + "°C" 
        } else if (t < 0) {
            return "- " + `${Math.abs(t.toFixed(2))}` + "°C"
        } 
    }

    // fonction qui permet d'appeler la fonction générique movingAverage
    function movingAverageCall(curve, N)  {
        const values = dataSet[curveFeatures[curve].source]
        const averageType = curveFeatures[curve].type
        // conversion mois en années si les valeurs sont annuelles :
        let NN = N
        if (curveFeatures[curve].source == "annual") { NN = Math.floor((N-1)/12)+1 }  
        //if (curveFeatures[curve].source == "annual") { NN = 1 }  
        return movingAverage(values, averageType, NN)
    }

    // moyenne glissante des "N" valeurs antérieures pour différents types de méthodes de calcul (averageType)
    function movingAverage(values, averageType, N)  {
        let means = Array()
        if (averageType == "simpleMovingAverage") {
            means = values.map( (x,i) => { 
                    if (i < N-1) { return {
                        "date":`${x.date}`, 
                        "moy": NaN 
                    }
                    } else { return {
                        "date":`${x.date}`, 
                        "moy": d3.mean( values.slice(i+1-N, i+1).map((v)=>v.gap) )
                    }
                }
            })
        }
        if (averageType == "centeredMovingAverage") {
            means = values.map( (x,i) => { 
                if (i < Math.trunc(N/2) || i > values.length-Math.trunc(N/2)-N%2 ) { return {
                    "date":`${x.date}`, 
                    "moy": NaN 
                }} else { return {
                    "date":`${x.date}`, 
                    "moy": d3.mean( values.slice(i-Math.trunc(N/2), i+Math.trunc(N/2)+N%2).map((v)=>v.gap) )
                }}
            })
        }
        if (averageType == "weightedMovingAverage") {
            means = values.map( (x,i) => { 
                if (i < N-1) { return {
                    "date":`${x.date}`, 
                    "moy": NaN 
                }} else { return {
                    "date":`${x.date}`, 
                    "moy": d3.mean( values.slice(i+1-N, i+1).map(
                        (v,j) => (j+1)*v.gap
                    ))  *2/(N+1)
                }}
            })
        }

        if (averageType == "exponentialMovingAverage") {
            let alpha = 2/(N+1)
            means = values.map( (x,i) => {
                if (i < N/2) { return {
                    "date":`${x.date}`, 
                    "moy": NaN 
                }} else { return {
                    "date":`${x.date}`, 
                    "moy": values.slice(0,i+1).map((x) => x.gap).reduce( 
                        (accumulator, currentValue) => alpha*currentValue+(1-alpha)*accumulator , 0
                )
                }}
            })
        }
        return means
    }

    // === dessin des flèches (pour le zoom) ===
    function arrowPath(b, l, r, dir) {
        // retourne le path pour le tracé d'une flèche dirigée vers la gauche ou la droite
        // b = base (vertiale)
        // l = longueur
        // r = rayons
        // dir = -1 (dirigée vers la gauche) ou +1 (vers la droite)
        const alpha = Math.atan2(b/2, l)
        return `M 0, ${-b/2+r}
            V ${b/2-r}
            Q 0,${b/2} ${dir*r*Math.cos(alpha)},${b/2-r*Math.sin(alpha)}  
            L ${dir*(l-r*Math.cos(alpha))},${r*Math.sin(alpha)} 
            Q ${dir*l},0 ${dir*(l-r*Math.cos(alpha))},${-r*Math.sin(alpha)}  
            L ${dir*r*Math.cos(alpha)},${-b/2+r*Math.sin(alpha)} 
            Q 0,${-b/2} 0, ${-b/2+r} z`  
    }    

    // === Fonctions de calcul des échelles ===

    function NScaleGenerator(){
        // retourne la fonction permettant de convertir la valeur N en pixels sur le slider
        return d3.scaleLinear()
            .domain([0, Nmax])
            .range([0, rangeN])
    }

    function xScaleGenerator(tStart, tEnd) {
        // retourne la fonction permettant de convertir la valeur x en pixel :
        return d3.scaleTime()
            .domain([tStart, tEnd])
            .range([0, rangeX])
    }

    function yScaleGenerator(tStart, tEnd){
        // retourne la fonction permettant de convertir la catégorie y en pixel :
        const yMin = d3.min(dataSet.monthlyconf, function(d) { 
                if ((d3.timeParse("%Y-%m")(d.date) >= tStart) && (d3.timeParse("%Y-%m")(d.date) <= tEnd )) {
                    return d.min
                }
            })
        const yMax = d3.max(dataSet.monthlyconf, function(d) { 
                if ((d3.timeParse("%Y-%m")(d.date) >= tStart) && (d3.timeParse("%Y-%m")(d.date) <= tEnd )) {
                    return d.max
                }
            })
        return d3.scaleLinear()
            .domain([yMin-(yMax-yMin)*vMargin, yMax+(yMax-yMin)*vMargin])
            .range( [rangeY,0] )
    }

    function easeInOut(q, t) {
        // fonction easeInOut paramètre q (q=2 quadratique, q=3 cubique...)
        // retourne une valeur entre 0 et 1 pour t entre 0 et 1
        if (t<=0) { return 0 
        } else if (t>0 && t<=1/2) { return Math.pow(2*t, q)/2 
        } else if (t>1/2 && t<1) { return 1-Math.pow(2-2*t, q)/2 
        } else { return 1 }
    }

    function ease(inc, nStep, ms0, ms) {
        // fonction progressive ease-in / ease-out pour nouveau traçage après validation du zoom :
        if (inc < nStep) {
            return(ms0+(ms-ms0)*easeInOut(3, inc/nStep))
        } else { return ms }
    }
    
    const transitionDuration = 200
    const currentTransition = (td) => d3.transition()
        .duration(td)
        .ease(d3.easeLinear)

//////////////////////////////////////////////////////
///                                                ///
///  FONCTIONS DE TRACES DES ELEMENTS GRAPHIQUES   ///
///                                                ///
//////////////////////////////////////////////////////

    function arrowTrace(h, col, opa) {
        // trace les flèches de zoom
        zoomContainer.selectAll(".zoomArrow")
            .attr("d", function(d) { return arrowPath(h, h*0.75, h*0.2, d[2]) })
            .style("fill", col)
            .style("opacity", opa)
    }

    function sliderTrace(N, NScale) {
        // trace et met à jour le slider en fonction de NScale :
        sliderContainer.select("#sliderlabel").text(`${legendeSlider}\xA0: ${N}\xA0mois`)
        fixBar.attr("x", -rRunner/4).attr("width", `${NScale(Nmax)+rRunner/2}`) // track 
            .attr("y",-rRunner/4)
            .attr("height",rRunner/2)
            .attr("rx",rRunner/4).attr("ry",rRunner/4)
            .style("stroke-width", rRunner/10)
        moveBar.attr("x",-rRunner/4).attr("width", `${NScale(N)+rRunner/4}`) // track gauche (coloré)
            .attr("y",-rRunner/4)
            .attr("height",rRunner/2)
            .attr("rx",rRunner/4).attr("ry",rRunner/4)
        // curseur :
        runner.transition(currentTransition(transitionDuration))
            .attr("transform", `translate( ${NScale(N)}, 0)` )
        runner.select("#touchDisc").attr("r", rRunner*2)
        runner.select("#button").attr("r", rRunner*0.7)
        runner.select("#rim").attr("r", rRunner*0.5)
        let NAxisGenerator = d3.axisBottom(NScale).ticks(nnticks).tickFormat(k => sepMilliers(k))
        NAxis.call(NAxisGenerator)
        NAxis.selectAll(".tick").select("line").attr("y2", rRunner*0.8)
        NAxis.selectAll(".tick").select("text").attr("y", rRunner*1.2)
    }

    function legendTrace() {
        // trace les légendes des courbes
        legendContainer.selectAll("svg").attr("width", `${dLegend*3}px`).attr("height", `${dLegend}px`)
        legendContainer.selectAll("li").select(".legendline")
            .attr("d", `M 0 ${dLegend} 
                L ${dLegend*0.7} ${dLegend/3} 
                L ${dLegend*1.5} ${dLegend/2} 
                L ${dLegend*2.0} ${dLegend*0.8}
                L ${dLegend*3} 0`) 
            .style("stroke", function(d) { return curveFeatures[d].color })
            .style("stroke-width", function(d) { return curveFeatures[d].thick})
            .style("fill", "none")
        legendContainer.selectAll("li").select(".legendbullet")
            .attr("transform", `translate(${dLegend*3/2},0)`)
            .attr("d", function(d,i) {
                if (curveFeatures[d].type =="margin") {
                    return `M ${-rBullet} 0 h ${rBullet*2} M 0 0 v ${dLegend} M ${-rBullet} ${dLegend} h ${rBullet*2}`
                } else {
                    return `M ${-rBullet} ${dLegend/2} A ${rBullet} ${rBullet} 0 1 1 ${-rBullet} ${dLegend/2+1} `
                }
            })
            .style("stroke", function(d) {
                if (curveFeatures[d].type =="margin") {
                    return curveFeatures[d].dashcolor 
                }  else { 
                    return "none"
                }
            })
            .style("fill", function(d) {
                if (curveFeatures[d].type !="margin") {
                    return curveFeatures[d].color 
                }  else { 
                    return "none"
                }
            })
            .style("stroke-width", function(d) {
                if (curveFeatures[d].type !="margin") { return curveFeatures[d].dashthick } 
            })


        legendContainer.selectAll("li").select("p")
            .attr("title", function(d){ return curveFeatures[d].legend.replace(/_month_/, `${N}`) })
            .text(function(d){ return curveFeatures[d].legend.replace(/_month_/, `${N}`) })
    }

    function graphTrace(curve, tStart, tEnd, xScale, yScale) {
        // trace la courbe des température de la BD HadCRUT5
        traceContainer.select("#"+curve).attr("stroke", curveFeatures[curve].color)
            .attr("stroke-width", curveFeatures[curve].thick)
            .attr("d", d3.line()
                .defined(d => (d3.timeParse("%Y-%m")(d.date) >= tStart) && (d3.timeParse("%Y-%m")(d.date) <= tEnd )) 
                .x(d => xScale(d3.timeParse("%Y-%m")(d.date)))
                .y(d => yScale(d.gap)) 
            )
    }

    function confTrace(curve, tStart, tEnd, xScale, yScale) {
        // trace l'intervalle de confiance de la courbe des température de la BD HadCRUT5
        traceContainer.select("#"+curve)
            .attr("fill", curveFeatures[curve].color)
            .attr("opacity", curveFeatures[curve].opacity)
            .attr("d", d3.area()
                .defined(d => (d3.timeParse("%Y-%m")(d.date) >= tStart) && (d3.timeParse("%Y-%m")(d.date) <= tEnd )) 
                .x(d => xScale(d3.timeParse("%Y-%m")(d.date)))
                .y0(d => yScale(d.min)) 
                .y1(d => yScale(d.max)) 
            )
    }

    function movingAverageTrace(curve, N, tStart, tEnd, xScale, yScale) {
        traceContainer.select("#" + curve)
            .datum(movingAverageCall(curve, N))
            .attr("stroke",curveFeatures[curve].color)
            .attr("stroke-width", curveFeatures[curve].thick)
            .attr("d", d3.line()
                .defined(d => (!isNaN(d.moy)) && ((d3.timeParse("%Y-%m")(d.date) >= tStart) && (d3.timeParse("%Y-%m")(d.date) <= tEnd ))) 
                .x(d => xScale(d3.timeParse("%Y-%m")(d.date)))
                .y(d => yScale(d.moy))
                .curve(d3.curveCardinal)
            )
    }

    function axisTrace(xScale, yScale) {
        // trace les axes x et y et ref
        xAxis.selectAll(".tick").remove("line")
        yAxis.selectAll(".tick").remove("line")
        axesContainer.selectAll("path").remove()
        axesContainer.selectAll("text").remove()
        let xAxisGenerator = d3.axisBottom(xScale).ticks(nxticks)
        xAxis.attr("transform", `translate(0, ${rangeY})` ).call(xAxisGenerator)
        xAxis.selectAll(".tick").append("line").attr("y2", -rangeY)
            .attr("stroke", "#888")
            .attr("stroke-width","0.5px")
        // ne pas afficher les labels aux extrémités de l'axe x :
        xAxis.selectAll("text").style("visibility", function() {
            let tickXPosition = d3.select(this.parentNode).node().transform.baseVal.getItem(0).matrix.e
            if (tickXPosition <=15 || tickXPosition >= rangeX-15) { return "hidden" }
        })
        let yAxisGenerator = d3.axisLeft(yScale)
            .tickFormat(function(d,i) { if (d>=0) {return `+${d}°C` } else { return `${d}°C` }} )
            .ticks(nyticks)
        yAxis.call(yAxisGenerator)
        yAxis.selectAll(".tick").append("line").attr("x2", rangeX) 
            .attr("stroke", "#888")
            .attr("stroke-width","0.3px")
        // axe Y = 0°C :
        axesContainer.append("path").attr("d", function() { 
            if (yScale(0) > 0 && yScale(0) < rangeY) { return `M 0, ${yScale(0)} H ${rangeX}`}
        })
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-width", 0.5)
        // axe Y = +1,50°C :
        axesContainer.append("path").attr("d", function() { 
            if (yScale(1.5) > 0 && yScale(1.5) < rangeY) { return `M 0, ${yScale(1.5)} H ${rangeX}`}
        })
            .attr("fill", "none")
            .attr("stroke", "#d00")
            .attr("stroke-width", 0.5)
        // label "+1,5°C" 
        axesContainer.append("text").text(function() { 
            if (yScale(1.5) > 0 && yScale(1.5) < rangeY) { return "+1,5°C"}
        })
            .attr("x", xScale(tLeft)+10)
            .attr("y", yScale(1.5)-2)
            .attr("fill", "#d00")
            .attr("font-size", "12px")
    }

    function zoomTrace(tStart, tEnd, tLeft, tRight) {
        // trace les curseurs de zoom et les zones du graphe :
        //      [tMin, tMax] : min et max des données
        //      [tStart, tEnd] : fenêtre courante qui est est affichée
        //      [tLeft, tRight] : fenêtre proposée par la fonction zoom, ajustable en draguant les deux curseurs sur l'axe X 
        //      -> si tStart < tLeft (ou tRight < tEnd) : il s'agit d'un zoom (rétrécissement de la fenêtre)
        //      -> si tLeft < tStart (ou tEnd < tRight) : il s'agit d'un dezoom (élargissement de la fenêtre)
        //      Après validation de la fenêtre proposée, [tStart, tEnd] prend la valeur de  [tLeft, tRight]
        //
        
        // tracé des zones délimitant les portions proposées à zoomer ou à dézoomer
        // ... volets mobiles  
        zoomContainer.select("#zoomFrames").selectAll("rect")
            .attr("y",-rangeY).attr("height", rangeY)
            .attr("x", function(d) {
                if (d[1] == "left") { return 0 }
                if (d[0] === "tease" && d[1] === "right") { return xScale(tEnd) }
                if (d[0] === "mask" && d[1] === "right") { return xScale(tRight) }
            })
            .attr("width", function(d) {
                if (d[0] === "tease" && d[1] === "left") { return Math.max(0, xScale(tStart)) }
                if (d[0] === "tease" && d[1] === "right") { return Math.max(0, rangeX - xScale(tEnd)) }
                if (d[0] === "mask" && d[1] === "left") { return Math.max(0, xScale(tLeft)) }
                if (d[0] === "mask" && d[1] === "right") { return Math.max(0, rangeX - xScale(tRight)) }
            })
            .style("fill", function(d) {
                if (d[0] == "tease") { return "#fff" }
                if (d[0] == "mask") { return "#888" }
            })
            .style("opacity", function(d) {
                if (d[0] == "tease") { return 0.6 }
                if (d[0] == "mask") { return 0.2 }
            })

         // ... lignes bordant les volets mobiles  
         zoomContainer.select("#zoomFrames").selectAll("path")
            .attr("d", function(d) {
                if (d[0] === "tease" && d[1] === "left") { return `M ${xScale(tStart)},0 V ${-rangeY}` }
                if (d[0] === "tease" && d[1] === "right") { return `M ${xScale(tEnd)},0 V ${-rangeY}` }
                if (d[0] === "mask" && d[1] === "left") { return `M ${xScale(tLeft)},0 V ${-rangeY}`  }
                if (d[0] === "mask" && d[1] === "right") { return `M ${xScale(tRight)},0 V ${-rangeY}` }
            })
            .attr("fill", "none")
            .attr("stroke",  function(d) {
                if (d[0] === "tease" ) { return "#444" }
                if (d[0] === "mask") { return "#000" }

            })
            .attr("stroke-width", function(d) {
                if (d[0] === "tease" ) { return 0.5 }
                if (d[0] === "mask" && d[1] === "left") { return 1.0 }
                if (d[0] === "mask" && d[1] === "right") { if (xScale(tRight) < rangeX) { return 1.0 } else { return 0.5 }}
            })
            .attr("stroke-dasharray", function(d) {
                if (d[0] === "tease" ) { return "2, 3" }
                if (d[0] === "mask" && d[1] === "left") { return "4, 3" }
                if (d[0] === "mask" && d[1] === "right" && xScale(tRight) < rangeX) { return "4,3" }
            })
            .style("opacity",  function(d) {
                if (d[0] === "tease" && d[1] === "left") { return 1.0*(xScale(tStart) > 0) }
                if (d[0] === "tease" && d[1] === "right") { return 1.0*(xScale(tEnd) < rangeX) }
                if (d[0] === "mask" && d[1] === "left") { return 1.0*(xScale(tLeft) > 0) }
            })

        // tracé des ensembles draguables : curseurs + flèches + ticks
        // positionnement des runnercontainers gauche et droite :
        zoomContainer.select("#left").attr("transform", `translate( ${xScale(tLeft)}, 0 )` )
        zoomContainer.select("#right").attr("transform", `translate( ${xScale(tRight)}, 0 )` )
        // ... tracé ensembles draguables : tick
        zoomContainer.select("#left").select(".tick").select("text")
            .text(convertDate(tLeft))
        zoomContainer.select("#right").select(".tick").select("text")
            .text(convertDate(tRight))
        // ... tracé ensembles draguables : curseurs + flèches
        zoomContainer.selectAll(".runner").attr("transform", `translate( 0 , ${-hCursor} )` )
        // ...... tracé de la "touchZone", invisible mais servant à la détection souris ou tactile
        zoomContainer.selectAll(".touchZone")
            .attr("cx", 0).attr("cy", 0)
            .attr("r", hCursor*2)
            .style("opacity", 0.0)

        // ....... tracé des flèches gauche et droite pour dézoomer / zoomer
        zoomContainer.selectAll(".zoomArrow")
            .attr("transform", function(d) { return `translate( ${d[2]*hCursor/10}, 0 )` })
           
        // propriétés communes pour l'affichage des ticks
        zoomContainer.selectAll(".tick").select("line")
            .attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 18)
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-width", 1.0)
        zoomContainer.selectAll(".tick").select("text")
            .attr("fill", "#000")
            .style("font-size", "12px")
            .attr("x", 0).attr("y", 30)
            .attr("text-anchor", "middle")
    }

    function allTrace(tS, tE, tL, tR, tL0, tR0) {
        // regroupement des fonctions de tracé
        // pour tout tracer à l'initialisation ou lors des events de zoom
        xScale = xScaleGenerator(tL0, tR0)
        yScale = yScaleGenerator(tL0, tR0)
        zoomTrace(tS, tE, tL, tR)
        
        for (curve of Object.keys(curveFeatures)) {
            if (curveFeatures[curve].type == "linear") {
                graphTrace(curve, tL0, tR0, xScale, yScale)
            } else if (curveFeatures[curve].type == "margin") {
                confTrace(curve, tL0, tR0, xScale, yScale)
            } else {
                movingAverageTrace(curve, N, tL0, tR0, xScale, yScale)
            }
        }
        axisTrace(xScale, yScale)
    }

////////////////////////////////////////////////
///                                          ///
///  INITIALISATION DE LA STRUCTURE DU HTML  ///
///                                          ///
////////////////////////////////////////////////

    d3.select("body").attr("class", "nohighlight")
    // === CONTAINER ===
        let graphContainer = d3.select("body").insert("div")
            .attr("id", "graphContainer").attr("class", "nohighlight")

    // === TITRE ===
        let titreContainer = graphContainer.insert("div").attr("id", "titreContainer")
        titreContainer.append("h1").attr("class", "noselect").text(title)
        titreContainer.append("h2").attr("class", "noselect").text(subTitle)

    // === STRUCTURE DU GRAPHIQUE ===
        let svgContainer = graphContainer.append("svg")
            .attr("id", "svgContainer")

        // Tracé des courbes :
            let traceContainer = svgContainer.append("g").attr("id", "traceContainer")

            // Liste des sources par ex ["monthly", "annual",...]
            const sourceList = Object.entries(curveFeatures)
                                    .map((x) => x[1].source)
                                    .reduce((acc, curr) => {
                                        if (!acc.includes(curr)) {
                                            acc.push(curr)
                                        }
                                        return acc
                                    }, [])


            const curveList = Object.keys(curveFeatures)

            // on met les curves de type "margin" (= courbe de plage de confiance entre min et max) en premier pour les imprimer en arrière plan
            reorderedCurveList = curveList.filter((x) => curveFeatures[x].type == "margin").concat(curveList.filter((x) => curveFeatures[x].type != "margin"))

            for (let curve of reorderedCurveList) {
                traceContainer.append("path")
                    .attr("id", curve)
                    .datum(() => {
                        if (Object.keys(dataSet).includes(curve)) { return dataSet[curve] }
                    })
                    .attr("fill", "none")
                    .style("transition", "opacity 1s")
            }

        // Axes :
            let axesContainer = svgContainer.append("g").attr("id", "axesContainer")
            let xAxis = axesContainer.append("g").attr("id", "xAxis")
            let yAxis = axesContainer.append("g").attr("id", "yAxis")

        // Lignes points et infobulles apparaissant en hover :
            let hoverContainer = svgContainer.append("g").attr("id", "hovercontainer").style("visibility", "hidden")
            hoverContainer.append("g").attr("id", "hoverticks")
            hoverContainer.append("g").attr("id", "hovertooltips")
            // ... hoverticks : les ticks qui viennent se superposer aux courbes
                // ...... ligne verticale pointillée
                    hoverContainer.select("#hoverticks").append("line")
                        .attr("id", "hoverline")
                        .style("stroke-dasharray", "6 2")
                        .style("stroke", "#000").style("stroke-width", "0.5px")

                // ...... ticks "tiret" pour les intervalles de confiance
                    hoverContainer.select("#hoverticks")
                        .selectAll("path")
                        .data(curveList.filter((x) => curveFeatures[x].type == "margin")) 
                        .enter()
                        .append("path")
                        .attr("class", "hovertickdash")
                        .attr("id", (d) => "hover" + d )
                        .style("fill", "none")
                        .style("stroke", (d) => curveFeatures[d].dashcolor)
                        .style("stroke-width", (d) => curveFeatures[d].dashthick)

                // ...... bullets
                    hoverContainer.select("#hoverticks")
                        .selectAll("circle")
                        .data(curveList.filter((x) => curveFeatures[x].type != "margin")) 
                        .enter()
                        .append("circle")
                        .attr("class", "hovertickbullet")
                        .attr("id", (d) => "hover" + d )
                        .attr("r",rBullet)
                        .style("stroke", "none")
                        .style("fill", (d) => curveFeatures[d].color)

            // ... hovertooltips : les infobulles
                hoverContainer.select("#hovertooltips").append("path").attr("id", "tooltipframe")
                    .attr("stroke", "#777").attr("stroke-width", "0.5").attr("fill", "#eee").attr("opacity", 0.95)
                hoverContainer.select("#hovertooltips").append("g").attr("id", "tooltipcontent")

        // construction de la liste des courbes dans l'ordre d'affichage du tooltip
            let tooltipNumberOfLines = Object()
            for (source of sourceList) {
                let tooltipMenu = Array()
                hoverContainer.select("#tooltipcontent").append("g").attr("id", `tooltip${source}`)
                hoverContainer.select(`#tooltip${source}`).append("text").attr("id", `tooltip${source}date`)
                for (curve of curveList.filter((x) => curveFeatures[x].type != "margin" && curveFeatures[x].source == source)) {
                    const marginCurve = curveList.filter((x) => (curveFeatures[x].type === "margin") && (curveFeatures[x].source == curve) )
                    if (marginCurve.length === 0) {
                        tooltipMenu.push(curve+"-gap")
                    } else {
                        tooltipMenu.push(marginCurve[0]+"-max", curve+"-gap", marginCurve[0]+"-min")
                    }
                }
                hoverContainer.select(`#tooltip${source}`).selectAll("g")
                    .data(tooltipMenu)
                    .enter().append("g").attr("id", (d) =>  d )
                hoverContainer.select(`#tooltip${source}`).selectAll("g")
                    .append("path")
                    .attr("class", "tooltipsymbol")
                hoverContainer.select(`#tooltip${source}`).selectAll("g")
                    .append("text")
                    .attr("class", "tooltiptext noselect")
                    
                tooltipNumberOfLines[source] = 1 + tooltipMenu.length
            }
            const tooltipNumberOfLinesTotal = Object.values(tooltipNumberOfLines).reduce((acc, cur) => acc+cur, 0)

        // Fonctionnalité zoom temporel :
            let zoomContainer = svgContainer.append("g").attr("id", "zoomContainer")

        // volets et bordures de sélection zoom / dezoom :
            zoomContainer.append("g").attr("id", "zoomFrames")
            zoomContainer.select("#zoomFrames").selectAll("rect") //volets mobiles pour dévoiler ou masquer 
                .data([
                    ["tease", "left"],
                    ["tease", "right"],
                    ["mask", "left"],
                    ["mask", "right"],
                ]).enter().append("rect").attr("class", function(d) { return d[0] })
            zoomContainer.select("#zoomFrames").selectAll("path") //lignes verticales bordant les volets
                .data([
                    ["tease", "left"],
                    ["tease", "right"],
                    ["mask", "left"],
                    ["mask", "right"],
                ]).enter().append("path").attr("class", function(d) { return d[0] })
            zoomContainer.select("#zoomFrames").selectAll(".tease").style("transition", "opacity 0.5s")

        // zone de contact (pointeur souris ou doigt) pour affichage des infos et tooltips en hover
        // et pour validation par click pour opérer le nouveau tracer sélectionné
            let touchZone = zoomContainer.append("rect").attr("id", "touchZone").style("opacity", 0.0) 

            // ensembles draguables : flèches + ticks
            zoomContainer.append("g").attr("class", "runnerContainer nohighlight").attr("id", "left")
            zoomContainer.append("g").attr("class", "runnerContainer nohighlight").attr("id", "right")
            zoomContainer.selectAll(".runnerContainer").style("cursor", "pointer")
            // ... ensembles draguables : tick et ligne pointillée
            zoomContainer.selectAll(".runnerContainer").append("g").attr("class", "tick")
            zoomContainer.selectAll(".tick").append("line").attr("tickLine")
            zoomContainer.selectAll(".tick").append("text")
            // ... ensembles draguables : curseurs + flèches
            zoomContainer.selectAll(".runnerContainer").append("g").attr("class", "runner nohighlight")
            // ...... "touchZone", invisible mais servant à la détection souris ou tactile
            zoomContainer.selectAll(".runner").append("circle").attr("class", "touchZone nohighlight").style("opacity", 0.0)
            // ....... flèches gauche et droite pour dézoomer / zoomer
            zoomContainer.select("#left").selectAll(".runner").selectAll("path")
                .data([
                    ["left", "leftdir", -1],
                    ["left", "rightdir", 1],
                ])
                .enter()
                .append("path")
                .attr("class", "zoomArrow")
            zoomContainer.select("#right").selectAll(".runner").selectAll("path")
                .data([
                    ["right", "leftdir", -1],
                    ["right", "rightdir", 1],
                ])
                .enter()
                .append("path")
                .attr("class", "zoomArrow")

        // infobulle d'explication zoom :
            zoomContainer.append("g").attr("id","zoomTooltip")
                .style("visibility", "hidden")
            zoomContainer.select("#zoomTooltip").append("path")
                .attr("id","zoomTooltipFrame")
                .attr("stroke", "#777").attr("stroke-width", "0.5")
                .attr("fill", "rgb(255,255,200").attr("opacity", 0.9)

            zoomContainer.select("#zoomTooltip").append("g")
                .attr("id","zoomTooltipText")

    // === FOOTER CONTAINER ===
        let footerContainer = graphContainer.append("div").attr("id", "footerContainer")

        // ... SLIDER (choix de la période pour le calcul de la moyennne glissante ...
            let sliderContainer = footerContainer.append("div").attr("id", "sliderContainer")
            sliderContainer.append("p").attr("id", "sliderlabel").attr("class", "noselect") 
            sliderContainer.append("svg").attr("id", "svgSlider")
            sliderContainer.select("#svgSlider").append("g").attr("id", "slideBloc")
            let NAxis = sliderContainer.select("#slideBloc").append("g").attr("id", "NAxis")
            sliderContainer.select("#slideBloc").append("g").attr("class", "nohighlight").attr("id", "slideBar")
                .attr("cursor", "pointer")
            let fixBar = sliderContainer.select("#slideBar").append("rect")   // barre vide (toute la largeur de 0 à Nmax)
            let moveBar = sliderContainer.select("#slideBar").append("rect")  // barre remplie de 0 au curseur
            let runner = sliderContainer.select("#slideBar").append("g").attr("id", "runner")
            runner.append("circle").attr("id", "touchDisc")
                .style("opacity", 0.0)
            runner.append("circle").attr("id", "button")
                .style("fill", "#fff")
                .style("stroke", panelColor.stroke)
                .style("stroke-width", 1)
            runner.append("circle").attr("id", "rim")
            runner.selectAll("circle").attr("cx", 0).attr("cy", 0)

        // ... LEGEND (légende du graphique) ...
            let legendContainer = footerContainer.append("div").attr("id", "legendContainer")
            legendContainer.append("ul")
                .selectAll("li")
                .data(curveList).enter()
                .append("li")
                .attr("id", function(d) { return "leg-"+d })
                .style("transition", "opacity 1s")
            legendContainer.selectAll("li").append("svg")
            legendContainer.selectAll("li").select("svg").append("path").attr("class", "legendline")
            legendContainer.selectAll("li").select("svg").append("path").attr("class", "legendbullet")
            legendContainer.selectAll("li").append("p").attr("class", "noselect")

//////////////////////////////////////////////////////////////////////
///                                                                ///
///  INITIALISATION DU PREMIER GRAPHIQUE A L'OUVERTURE DE LA PAGE  ///
///                                                                ///
//////////////////////////////////////////////////////////////////////

    // paramètres d'affichage en fonction de la taille d'écran
    graphDisplay()
    // Echelle de temps qur l'axe X :
    let tStart = d3.min(dataSet["monthly"], function() { return d3.timeParse("%Y-%m")(dateDebut) }) // début du graph
    let tEnd = d3.max(dataSet["monthly"], function() { return d3.timeParse("%Y-%m")(dateFin) })   // fin du graph
    let tLeft = tStart                                                                    // position curseur gauche de zoom
    let tRight = tEnd                                                                     // position curseur droit de zoom
    let tLeft0 = tStart                                                                   // mémorisation extrémité gauche (correspond à x=0)
    let tRight0 = tEnd                                                                    // mémorisation extrémité droite (correspond à x=rangeX) 

    // Tracé du slider pour moyenne glissante sur N mois :
    let NScale = NScaleGenerator()
    sliderTrace(N, NScale)
    lightBarOff() 
    legendTrace()

    // Tracé de la zone de graphique :
    allTrace(tStart, tEnd, tLeft, tRight, tLeft0, tRight0)
    arrowTrace(hCursor*ratioCursorOff, panelColor.fill, 0.5)
    zoomTooltipTextCreate()

///////////////////////////////////////////////////
///                                             ///
///  ECOUTEURS ET GESTIONNAIRES DES EVENEMENTS  ///
///                                             ///
///////////////////////////////////////////////////

    // =================================================================================
    //      Fonctions d'affichage des infobulles, déclenchées par le survol du graph 
    // =================================================================================
        function tooltipPath1(w, h1, h2, f, b, r, orient) {
            // retourne le path pour le tracé de l'infobulle <path d="..." >
            // flèche orientée vers la gauche ou la droite
            // w = largeur (hors flèche)
            // h1 = demi-hauteur supérieure
            // h2 = demi-hauteur inférieure
            // f = longueur de la flèche
            // b = demi-largeur de la flèche
            // r = rayons
            // orient = orientation (-1=flèche à droite ou 1=flèche à gauche)
            return `M 0,0 
                L ${f*orient},${-b} 
                V ${-h1+r}
                Q ${f*orient},${-h1} ${(f+r)*orient},${-h1}  
                H ${(f+w-r)*orient}   
                Q ${(f+w)*orient},${-h1} ${(f+w)*orient},${-h1+r}
                V ${h2-r}
                Q ${(f+w)*orient},${h2} ${(f+w-r)*orient},${h2}
                H ${(f+r)*orient}
                Q ${f*orient},${h2} ${f*orient},${h2-r}  
                V ${b} 
                L 0,0 z`
        }

        function tooltipPath2(w1, w2, h, f, b, r, orient) {
            // retourne le path pour le tracé de l'infobulle <path d="..." >
            // flèche orientée vers le bas
            // wr1 = demi-largeur gauche
            // w2 = demi-largeur droite
            // h = hauteur (hors flèche)
            // f = longueur de la flèche
            // b = demi-largeur de la flèche
            // r = rayons
            // orient = orientation (-1 = flèche en bas ou 1=flèche en haut)
            return `M 0,0 
                L ${b} ${f*orient} 
                H ${w2-r}
                Q ${w2},${f*orient} ${w2},${(f+r)*orient}  
                V ${(f+h-r)*orient}   
                Q ${w2},${(h+f)*orient} ${(w2-r)},${(h+f)*orient}
                H ${r-w1}
                Q ${-w1},${(h+f)*orient} ${-w1},${(h+f-r)*orient}
                V ${(f+r)*orient}
                Q ${-w1},${f*orient} ${r-w1},${f*orient}  
                H ${-b} 
                L 0,0 z`
        }

        function tooltipHeight(pointerY) {
            // retourne les deux demi-hauteurs de l'info bulle en fonction du nombre de lignes de texte écrites dans 
            // l'infobulle et des marges sup et inf du graphiques.

            let Htotal = tooltipNumberOfLinesTotal * tooltipInterLine + tooltipHPad*2
            let tooltipY = pointerY 
            if (touchDevice) { tooltipY = rangeY - pointerY }  
            let tooltipH1 = Htotal / 2
            let tooltipH2 = Htotal / 2
            if (tooltipH1 >= tooltipY + svgMargin.top -2) {
                tooltipH1 = tooltipY + svgMargin.top -2
                tooltipH2 = Htotal - tooltipH1
            }
            if (tooltipH2 >= rangeY - tooltipY + svgMargin.bottom) {
                tooltipH2 = rangeY - tooltipY + svgMargin.bottom
                tooltipH1 = Htotal - tooltipH2
            }

            return {"H1":tooltipH1, "H2":tooltipH2}
        }

        function hoverDisplay(e) {
            // trace la ligne verticale pointillée, les bullets, le tooltip et son texte
            // hover container : positionnement et visibilité
            let pointerX = e.clientX-svgMargin.left
            let pointerY = e.clientY -svgMargin.top -titreContainer.style("height").slice(0,-2)
            pointerX = (pointerX < 0) ? 0 : pointerX
            pointerX = (pointerX > rangeX) ? rangeX : pointerX
            let tRun = xScale.invert(pointerX).getTime()+month/2
            tRun = new Date(convertDate(new Date(tRun)))
            hoverContainer.attr("transform", `translate(${svgMargin.left}, ${svgMargin.top})`) 
                .style("visibility", "visible")
            
            // trace les ticks 
            hoverContainer.select("#hoverticks")
                .transition(currentTransition(transitionDuration))
                .attr("transform", `translate(${xScale(tRun)}, 0)`) 
            // ... trace la ligne verticale 
            hoverContainer.select("#hoverticks").select("#hoverline")
                .attr("x1", 0).attr("y1", 0)
                .attr("x2", 0).attr("y2", rangeY)
                

            // ... trace de l'intervalle de confiance :
            hoverContainer.select("#hoverticks").selectAll("path")
                .attr("d", function(d) {
                    const y = extractFromDataSet(tRun, dataSet[d])
                    if (y === undefined) { return "" } else { 
                        return `
                            M 0, ${yScale(y.max)}
                            V ${yScale(y.min)}
                            M ${-rBullet}, ${yScale(y.max)} h ${rBullet*2}
                            M ${-rBullet}, ${yScale(y.min)} h ${rBullet*2}
                        `
                    }
                })
            
            // ... trace les bullets :
            hoverContainer.select("#hoverticks").selectAll("circle")
                .attr("cx", 0).attr("cy", function (d) {
                    if (Object.keys(dataSet).includes(d)) { 
                        const y = extractFromDataSet(tRun, dataSet[d])
                        if (y === undefined) { return -500 } else { 
                            if (isNaN(y.gap)) { return -500 } else { 
                                return yScale(y.gap)
                            }}
                    } else { 
                        const y = extractFromDataSet(tRun, movingAverageCall(d, N))
                        if (y === undefined) { return -500 } else { 
                            if (isNaN(y.moy)) { return -500 } else { 
                                return yScale(y.moy)
                            }}
                    }
                })

            // tracer du tooltip et de son contenu
            hoverContainer.select("#hovertooltips")
                .transition(currentTransition(transitionDuration))
                .attr("transform", function() {
                if (touchDevice) { return `translate(${pointerX}, ${rangeY-pointerY})` }
                else { return `translate(${pointerX}, ${pointerY})` }
            })
            // ... tracer du tooltip (tooltipframe)
            let tooltipH1 = tooltipHeight(pointerY).H1
            let tooltipH2 = tooltipHeight(pointerY).H2
            let orient = 2*(tooltipWidth+fleche >= xScale(tRun))-1 // orientation de l'infobulle
            hoverContainer.select("#hovertooltips").select("#tooltipframe")
                .attr("d", function() {
                    return tooltipPath1(tooltipWidth, tooltipH1, tooltipH2, fleche, base, tooltipRadius, orient)
                })
                .attr("filter", "drop-shadow(8px 8px 4px rgba(100,100,100,0.5)") 
                
            // remplissage du tooltip tooltipcontent)
            hoverContainer.select("#tooltipcontent")
                .attr("transform", `translate(
                    ${tooltipWPad + orient*fleche + (orient-1)*tooltipWidth/2}, ${ -tooltipH1 + tooltipInterLine }
                )`)

            let previousLinesNumber = 0
            for (source of sourceList) {

                // ... date
                hoverContainer.select(`#tooltip${source}`).select(`#tooltip${source}date`)
                    .text(convertDate(tRun))
                    .text((source == "annual") ? "moyenne "+convertDate(tRun).slice(0,-3) : "mois: "+convertDate(tRun) )
                    .style("font-size", `${tooltipFontSize-2}px`)
                    .attr("font-weight", 700)
                    .attr("transform", `translate( ${-tooltipWPad/2}, ${tooltipInterLine*previousLinesNumber})`)

                // ... symbols
                hoverContainer.select(`#tooltip${source}`).selectAll("g").select(".tooltipsymbol")
                    .attr("transform", function(d,i) {
                        return `translate(0, ${tooltipInterLine*((i+previousLinesNumber)+1/4) })`
                    })
                    .attr("d", function(d,i) {
                        if (d.slice(-3) === "max") {
                            return `M 0 ${tooltipInterLine/2} h ${rBullet*2} M ${rBullet} ${tooltipInterLine/2} v${tooltipInterLine*2}`
                        } else if (d.slice(-3) == "min") {
                            return `M 0 ${tooltipInterLine/2} h ${rBullet*2}`
                        } else if (d.slice(-3) == "gap") {
                            return `M 0 ${tooltipInterLine/2} A ${rBullet} ${rBullet} 0 1 1 0 ${tooltipInterLine/2+1} `
                        }
                    })
                    .style("stroke", function(d) {
                        if (["min", "max"].includes(d.slice(-3))) {
                            return curveFeatures[d.slice(0,-4)].dashcolor 
                        }  else { 
                            return "none"
                        }
                    })
                    .style("fill", function(d) {
                        if (d.slice(-3) == "gap") {
                            return curveFeatures[d.slice(0,-4)].color 
                        }  else { 
                            return "none"
                        }
                    })
                    .style("stroke-width", function(d) {
                        if (["min", "max"].includes(d.slice(-3))) { return curveFeatures[d.slice(0,-4)].dashthick } 
                    })
                // ... text
                hoverContainer.select(`#tooltip${source}`).selectAll("g").select(".tooltiptext")
                    .attr("transform", function(d,i) {
                        return `translate(${rBullet*4}, ${tooltipInterLine*((i+previousLinesNumber)+1) })`
                    })
                    .text(function(d,i) {
                        // si la source est "annual", la date yyyy-mm est convertie en yyyy-12
                        tRun = (source == "annual") ? new Date(convertDate(tRun).slice(0,-3) + "-12") : tRun
                        if (Object.keys(dataSet).includes(d.slice(0,-4))) {
                            const y = extractFromDataSet(tRun, dataSet[d.slice(0,-4)])
                            if (y === undefined) { return "-" } else { return temperatureFormat(y[d.slice(-3)]) }
                        } else {
                            const y = extractFromDataSet(tRun, movingAverageCall(d.slice(0,-4), N))
                            if (y === undefined) { return "-" } else { return temperatureFormat(y.moy) }
                        }
                    })
                    .style("font-size", `${tooltipFontSize}px`)
                    .style("font-weight", function(d) { 
                        if (["gap"].includes(d.slice(-3))) { return "700"} 
                    })
                    .style("fill", function(d) {
                        if (["min", "max"].includes(d.slice(-3))){
                            return curveFeatures[d.slice(0,-4)].dashcolor
                        }  else { 
                            return curveFeatures[d.slice(0,-4)].color
                        }
                    })
                previousLinesNumber = tooltipNumberOfLines[source]
            }
        }

        function hoverHide() {
            // fin de survol d'une colonne : masquage ligne pointillée et infobulle
            hoverContainer.style("visibility", "hidden")
        }

        touchZone.on("pointermove", (e) => {
            if (! zoomMode && ! NMode) {
                let pointerX = e.clientX-svgMargin.left
                let pointerY = e.clientY-svgMargin.top - titreContainer.style("height").slice(0,-2)
                if ((pointerX < -svgMargin.left*0.8 || pointerX > rangeX + svgMargin.right*0.8) || (pointerY < 0 || pointerY > rangeY))  {
                //if (pointerY < 0 || pointerY > rangeY)  {
                    hoverHide()
                    graphContainer
                        .style("touch-action", "auto")
                        .style("user-select", "auto")
                } else {
                    graphContainer
                        .style("touch-action", "none")      // désactive les fonctions scroll en mobile
                        .style("user-select", "none")       // évite de sélectionner du texte en draguant le curseur
                    hoverDisplay(e)

                    touchZone.on("pointerup", (e) => {
                        graphContainer
                            .style("touch-action", "auto")
                            .style("user-select", "auto")
                        hoverHide()
                    })
                }
            }
        })

    // ===============================================================================
    //      Slider : choix de la taille de la fenêtre pour les moyennes glissantes
    // ===============================================================================

        function dragBarOn() {
            // éclairage du slider
            runner.select("#rim")
                .style("fill", panelColor.dragFill).style("opacity", 1.0)
        }

        function lightBarOn() {
            // éclairage du slider
            fixBar.style("fill", panelColor.hoverBackFill).style("stroke", panelColor.stroke)
            moveBar.style("fill", panelColor.hoverBackFill).style("stroke", panelColor.stroke)
            runner.select("#rim")
                .style("fill", panelColor.hoverFill).style("opacity", 1.0)
        }

        function lightBarOff() {
            // extinction du slider
            fixBar.style("fill", panelColor.backFill).style("stroke", panelColor.stroke)
            moveBar.style("fill", panelColor.backFill).style("stroke", panelColor.stroke)
            runner.select("#rim")
                .style("fill", panelColor.fill).style("opacity", 0.5)
        }

        function setSliderPosition(e) {
            // enregistre le N sélectionné et modifie le titre, le slider et le graphe
            xm = e.clientX - svgMargin.left 
            xmax = NScale(Nmax)
            if ( xm <=0 ) { xm = 0}
            if ( xm >= xmax ) { xm = xmax}
            N = Math.max(1, Math.round(NScale.invert(xm)))
            sliderTrace(N, NScale)
            for (curve of curveList.filter((x) => curveFeatures[x].type.includes("MovingAverage"))) {    
                movingAverageTrace(curve, N, tLeft0, tRight0, xScale, yScale)
            }
        }

        sliderContainer.select("#slideBar").on("pointerdown", e => {
            e.preventDefault()
            setSliderPosition(e)
        })

        sliderContainer.select("#slideBar").on("pointermove", e => {
            e.preventDefault()
            lightBarOn()
        })

        sliderContainer.select("#slideBar").on("pointerleave", e => {
            lightBarOff()
        })

        runner.on("pointerdown", e => {
            e.preventDefault()
            graphContainer.style("touch-action", "none")
            graphContainer.style("user-select", "none")
            NMode = true
            graphContainer.on("pointermove", e => {
                e.preventDefault()
                dragBarOn()
                hoverHide()
                setSliderPosition(e)
                graphContainer.on("pointerleave", e => {
                    e.preventDefault()
                    graphContainer.on("pointermove", null, { once:true } )
                    lightBarOff()
                    NMode = false
                })
            })
           
            graphContainer.on("pointerup", e => {
                e.preventDefault()
                graphContainer.on("pointermove", null, { once:true } )
                graphContainer.on("pointercancel", null, { once:true } )
                graphContainer.style("touch-action", "auto")
                lightBarOff()
                NMode = false
            })
        })

    // ================================================
    //     Zoom (double slider sur axe X)
    // ================================================

        // -----------------------------------------------------------
        // fonctions éclairage des flèches < >
        // -----------------------------------------------------------

            function latentZoom() {
                // éclairage et grossissement des flèches de zoom
                arrowTrace(hCursor*ratioCursorOff, panelColor.fill, 0.5)
            }

            function activZoom() {
                // éclairage et grossissement des flèches de zoom
                arrowTrace(hCursor, panelColor.hoverFill, 1.0)
            }

            function selectZoom(move) {
                // mise en surbrillance des flèches du côté gauche ou droite :
                arrowTrace(hCursor, panelColor.hoverFill, 1.0)
                zoomContainer.select("#"+move).selectAll(".zoomArrow")
                    .style("fill", panelColor.dragFill)
            }

            function dragZoom(move, dir) {
                // mise en surbrillance des flèches du côté gauche ou droit, dans le sens de déplacement du runner
                arrowTrace(hCursor, panelColor.hoverFill, 1.0)
                zoomContainer.selectAll(".zoomArrow").style("fill", function (d) {
                    if (d[0] == move && d[1] == dir+"dir" ) { return panelColor.dragFill } else { return panelColor.hoverFill }
                })
                zoomContainer.select("#"+move).select(".tick").select("text")
                                .style("fill", "#000").attr("font-weight", 400)
            }

            function stopZoom(move, dir) {
                // flèche et tick passent en rouge quand on arrive en butée (fin de course axeX ou butée sur l'autre runner)
                zoomContainer.select("#"+move).selectAll(".zoomArrow")
                    .style("fill", function(d) { 
                        if (d[1] == dir+"dir") { 
                            return panelColor.dragStop 
                        } else { return panelColor.hoverFill }
                    })
                zoomContainer.select("#"+move).select(".tick").select("text")
                    .style("fill", panelColor.dragStop).attr("font-weight", 900)
            }

        // -----------------------------------------------------------
        // fonction infobulles explicatives du zoom
        // -----------------------------------------------------------

            function zoomTooltipTextCreate() {
                zoomContainer.select("#zoomTooltipText").selectAll("text").remove()      
                zTtLineCount = 0
                let width =  zTtW1+zTtW2-2*zTtPad 
                let infoTextArray = zoomTooltipText.split(" ")
                let infoTextSplitted = Array(); // le texte est splitté en mots
                let t1 = ""
                for (const elt of infoTextArray) {
                    let t2 = [t1, elt].join(" ")       // on ajoute un mot après l'autre 
                    let textLine = zoomContainer.select("#zoomTooltipText").append("text")         //.text(t2)
                        .text(t2)
                        .style("font-family", "helvetica")
                                .style("fill", "#555")
                        .style("font-size", `${tooltipFontSize}px`)

                    let size = textLine.node().getBBox()
                    if (size.width > width) {  // dès que l'ajout d'un mot fait dépasser la ligne, on retire ce mot et on écrit la ligne.
                        textLine.text(t1).attr("y", tooltipInterLine*(zTtLineCount+1))
                        zTtLineCount ++                                  // et on passe à la ligne
                        t1 = elt                                      // la ligne suivante est initialisée au mot qui vient d'être retiré
                        if(elt == infoTextArray.findLast((x)=> true)) {  // si c'est le dernier mot, on l'écrit sur la dernière ligne.
                            let textLastLine =  zoomContainer.select("#zoomTooltipText").append("text")
                            textLastLine.text(elt)
                                .style("font-family", "helvetica")
                                .style("fill", "#555")
                                .style("font-size", `${tooltipFontSize}px`)
                                .attr("y", tooltipInterLine*(zTtLineCount+1))
                            zTtLineCount ++
                        }
                    } else {                                           // si l'ajout du mot ne fait pas dépasser la ligne :
                        if(elt == infoTextArray.findLast((x)=> true)) { // si c'était le dernier mot, on écrit alors la ligne
                            textLine.text(t2).attr("y", tooltipInterLine*(zTtLineCount+1));
                            zTtLineCount ++;
                        } else {                                        // sinon, cela veut dire qu'on peut mettre d'autres mots et donc on va continuer la boucle.
                            textLine.remove();                          // on supprime la balise <text> créée pour ne pas la doublonner
                            t1 = t2;                                    // on réinitialise la nouvelle ligne avec le mot supplémentaire.
                        }
                    }
                }
            }

            function zoomTooltipDisplay(e) {
                let mov = e.currentTarget.id
                zTtorient = (mov == "left")*2 -1
                zTtH = zTtLineCount*tooltipInterLine + zTtPad
                if (mov == "left") { 
                    zoomContainer.select("#zoomTooltip").style("visibility", "visible")
                        .attr("transform", `translate( ${xScale(tLeft)}, -${hCursor*2})`)
                    zoomContainer.select("#zoomTooltipText").attr("transform", `translate(
                        ${-zTtW1+zTtPad}, 
                        ${-zTtLineCount*tooltipInterLine-zTtfleche-zTtPad})`
                    )
                    zoomContainer.select("#zoomTooltipFrame")
                        .attr("d", `${ tooltipPath2(zTtW1, zTtW2, zTtH, zTtfleche, zTtbase, zTtRadius, -1) }`)
                        .attr("filter", "drop-shadow(-8px 8px 4px rgba(100,100,100,0.5)") 
                } else if (mov == "right") {
                    zoomContainer.select("#zoomTooltip").style("visibility", "visible")
                        .attr("transform", `translate( ${xScale(tRight)}, -${hCursor*2})`)
                    zoomContainer.select("#zoomTooltipText").attr("transform", `translate(
                        ${-zTtW2+zTtPad}, 
                        ${-zTtLineCount*tooltipInterLine-zTtfleche-zTtPad})`
                    )
                    zoomContainer.select("#zoomTooltipFrame")
                        .attr("d", `${ tooltipPath2(zTtW2, zTtW1, zTtH, zTtfleche, zTtbase, zTtRadius, -1) }`)
                        .attr("filter", "drop-shadow(-8px 8px 4px rgba(100,100,100,0.5)") 
                }
            }

            function zoomTooltipHide() {
                zoomContainer.select("#zoomTooltip").style("visibility", "hidden")

            }

        // -----------------------------------------------------------
        // fonctions de calcul des tracés de zoom et dezoom
        // -----------------------------------------------------------

            function setZoom(move, runnerX) {
                let tRun = roundDate(xScale.invert(runnerX))
                if (move === "left") {
                    let tLimSup = roundDate(
                        new Date( Math.min(
                            xScale.invert(xScale(tRight)-hCursor*1.5).getTime(), 
                            tRight.getTime()-month*12
                        ))
                    )
                    if (tRun <= tLeft0) { 
                        tRun = tLeft0 
                    } 
                    if (tRun >= tLimSup) { 
                        tRun = tLimSup
                        stopZoom("left", "right")
                    }
                    tLeft = tRun // nouvelle valeur de tLeft
                } else if (move === "right") {
                    let tLimInf = roundDate(
                        new Date(Math.max(
                            xScale.invert(xScale(tLeft)+hCursor*1.5).getTime(), 
                            tLeft.getTime()+month*12
                        ))
                    )
                    if (tRun >= tRight0) { 
                        tRun = roundDate(tRight0)  
                }
                    if (tRun <= tLimInf) { 
                        tRun = roundDate(tLimInf)   
                        stopZoom("right", "left")
                    }
                    tRight = tRun // nouvelle valeur de tRight
                }

                zoomTrace(tStart, tEnd, tLeft, tRight)
            }

        // -------------------------------------------------------------------
        //    Fonctions asynchrones pour effectuer un dezoomage progressif
        // -------------------------------------------------------------------

            let waitAndTrace = (duration, tS, tE, tL, tR, tL0, tR0) => {
                // fonction de traçage de courbes successives pour animation. Duration = temps entre 2 courbes
                return new Promise((resolve, reject) => {
                    setTimeout( () => {
                        resolve(allTrace(tS, tE, tL, tR, tL0, tR0))
                    }, duration)
                })
            }
            async function traceDuringDezoom(move) {  
                // défintion des paramètres pour tracer les courbes qui apparaissent en dézoomant
                while(dezoomProgress) {
                    if (move === "left") {
                        let msLeft = tLeft.getTime() // date en ms
                        msLeft = msLeft-Math.max(dezoomTimeStep,(tStart.getTime()-msLeft)/10)
                        tLeft = roundDate(new Date(msLeft))
                        if (tLeft <= tMin) {
                            tLeft = tMin
                            dezoomProgress = false
                            stopZoom("left", "left")
                        }
                        tLeft0 = tLeft
                    } else if (move ==="right") {
                        let msRight = tRight.getTime() // date en ms
                        msRight = msRight+Math.max(dezoomTimeStep, (msRight-tEnd.getTime())/10)
                        tRight = roundDate(new Date(msRight))
                        if (tRight >= tMax) { 
                            tRight = tMax
                            dezoomProgress = false 
                            stopZoom("right", "right")
                        }
                        tRight0 = tRight
                    }
                    await waitAndTrace(1, tStart, tEnd, tLeft, tRight, tLeft0, tRight0)
                }
            }

            async function traceAfterValidation() {
                // définiton des paramètres pour tracer l'animation après la sélection de zoom
                zoomContainer.select("#zoomFrames").selectAll(".tease").style("opacity", 0.0)
                const msLeft0 = tLeft0.getTime()
                const msLeft = tLeft.getTime()
                const msRight0 = tRight0.getTime()
                const msRight = tRight.getTime()
                const nStepL = Math.min((msLeft-msLeft0)/month, zoomMaxStep)
                const nStepR = Math.min((msRight0-msRight)/month, zoomMaxStep)
                let inc = 0    
                while (inc <= nStepL || inc <= nStepR)  { 
                    inc ++
                    tLeft0 = roundDate(new Date(ease(inc, nStepL, msLeft0, msLeft)))
                    tRight0 = roundDate(new Date(ease(inc, nStepR, msRight0, msRight)))
                    await waitAndTrace(1, tLeft0, tRight0, tLeft, tRight, tLeft0, tRight0)
                }
                zoomMode = false
                traceInProgress = false 
                tStart = tLeft
                tEnd = tRight
                tLeft0 = tLeft
                tRight0 = tRight
                await waitAndTrace(1, tLeft0, tRight0, tLeft, tRight, tLeft0, tRight0)
            }

            function zoomProcess(e) {
                // calcule et lance les tracés des curseurs et courbes pendant les actions de zoom et dezzom
                pointerX = e.clientX - svgMargin.left 
                const ends = (runnerX <= 0 || runnerX >= rangeX)    // runner aux extrémités de l'axe
                const findDirection = (bool) => { if (bool) {return "left"} else {return "right"} }
                const dir = findDirection(pointerX < pointerX0)         // left ou right si le pointer va vers la gauche ou vers la droite

                dragZoom(move, dir)
                if (!(move==="left" ^ dir==="left") && ends) {                    // cas de dezoom (élrgissement de la fenêtre)
                    pointerX0 = Math.max(0, pointerX)*(move==="left") + Math.min(rangeX, pointerX)*(move==="right")                   // mémorisation des coordonnées du pointeur (pour comparaison avec prochain mouvement)
                    shiftX = pointerX0 - runnerX                // mis à jour du nouveau décalage pointeur/runner
                    if (! dezoomProgress) {
                        dezoomProgress = true                   // dezoom activé
                        traceDuringDezoom(move)
                        dezoomProgress = true                   // lancement dezoom désactivé, pour ne pas relancer indéfiniment la fonction async count
                    } 
                } else {                                        // cas de zoom (volets réduisant la fenêtre)
                    dezoomProgress = false                      // dezoom désactivé => arrêt de la fonction async
                    runnerX = pointerX-shiftX                   // calcul nouvelle position du runner
                    setZoom(move, runnerX)                      // tracé du runner
                    pointerX0 = pointerX                        // mémorisation des coordonnées du pointeur (pour comparaison avec prochain mouvement)
                    dezoomProgress = false                      // autorisation de relancer la fonction async
                }
            }

        // -------------------------------------------------------------------
        // gestion des pointerevents
        // -------------------------------------------------------------------

            zoomContainer.selectAll(".runnerContainer").on("pointerenter", (e) => {             
                if (! zoomProgress && ! NMode) {
                    activZoom()
                    hoverHide()
                    zoomTooltipDisplay(e)
                }
            }) 

            zoomContainer.selectAll(".runnerContainer").on("pointerleave", (e) => {             
                latentZoom(e)
                zoomTooltipHide()
            }) 

            zoomContainer.selectAll(".runnerContainer").on("pointerdown", (e) => {              
                move = e.currentTarget.id
                selectZoom(move)
                zoomMode = true
                zoomProgress = true
                
                if (! touchDevice) {
                    zoomTooltipHide()
                }
                hoverHide()
                graphContainer
                    .style("touch-action", "none")      // désactive les fonctions scroll en mobile
                    .style("user-select", "none")       // évite de sélectionner du texte en draguant le curseur
                    .style("cursor", "pointer")         // curseur souris devient pointeur
                pointerX0 = e.clientX -svgMargin.left      // initialisation position pointeur (souris ou doigt)
                runnerX = xScale(tLeft)*(move === "left") + xScale(tRight)*(move === "right")
                shiftX = pointerX0 - runnerX    // initialisation décalage runner / pointeur
                
                graphContainer.on("pointermove", (e) => {
                    if (zoomProgress && ! traceInProgress) { zoomProcess(e) }
                })
                
                graphContainer.on("pointerleave", (e) => {
                    zoomProgress = false
                    dezoomProgress = false
                    zoomTooltipHide()
                    graphContainer
                        .style("user-select", "auto")
                        .style("cursor", "default")
                    latentZoom(e)
                    zoomContainer.select("#"+move).select(".tick").select("text")
                        .style("fill", "#000").attr("font-weight", 400)
                })

                graphContainer.on("pointerup", (e) => {
                    zoomProgress = false
                    dezoomProgress = false 
                    zoomTooltipHide()
                    graphContainer.style("touch-action", "auto")
                        .style("user-select", "auto")
                        .style("cursor", "default")
                    graphContainer.attr("cursor", "default")
                    latentZoom(e)
                    zoomContainer.select("#"+move).select(".tick").select("text")
                        .style("fill", "#000").attr("font-weight", 400)
                }) 
            })

        // -------------------------------------------------------------------
        // validation de la sélection zoom
        // -------------------------------------------------------------------

            touchZone.on("pointerdown", e => {
            if (zoomMode && ! traceInProgress) {
                traceInProgress = true
                traceAfterValidation()
                }
            })

    // ================================================
    //  masquage / affichage des courbes en cliquant sur les légendes
    // ================================================

        // dictionnaire { curve: displayStatus, ... } // displayStatus = 1 (display) ou 0 (hide) }
        const curveDisplayIndicator = curveList.reduce((obj, x) => Object.assign(obj, {[x]:1}), {} )

        function hideOrDisplay(curve, displayStatus) {
            traceContainer.select(`#${curve}`).style("opacity", displayStatus)
            legendContainer.select(`#leg-${curve}`).style("opacity", `${(displayStatus+1)/2}`)
        }

        function curveThicken(e) {
                const curve = e.currentTarget.id.slice(4)
                // épaississement des courbes 
                traceContainer.select(`#${curve}`)
                    .attr("stroke-width", `${curveFeatures[curve].thick*2}`)
                    .attr("fill", function() { 
                        if (curveFeatures[curve].type == "margin") { 
                            return curveFeatures[curve].dashcolor
                        } else { return "none" }
                    })
                // épaississement des ticks de la légende
                legendContainer.select(`#leg-${curve}`).selectAll(".legendline")
                    .style("stroke", function() {
                        if (curveFeatures[curve].type == "margin") { 
                            return curveFeatures[curve].dashcolor
                        } else {
                            return curveFeatures[curve].color
                        }
                    })
                    .style("stroke-width", function() {
                        if (curveFeatures[curve].type == "margin") { 
                            return curveFeatures[curve].thick
                        } else {
                            return curveFeatures[curve].thick*2
                        }
                    })
                legendContainer.select(`#leg-${curve}`).selectAll(".legendbullet")
                    .style("stroke", function() {
                        if (curveFeatures[curve].type == "margin") { return curveFeatures[curve].dashcolor }
                    })
                    .style("stroke-width", function() {
                        if (curveFeatures[curve].type == "margin") { return curveFeatures[curve].dashthick*2 }
                    })


                   // mise en gras du texte de la légende
                legendContainer.select(`#leg-${curve}`).select("p").style("font-weight", "bold")

            }

        function curveSlim(e) {
                const curve = e.currentTarget.id.slice(4)
                //  retour à épaisseur normale des courbes 
                traceContainer.select(`#${curve}`)
                    .attr("stroke-width", `${curveFeatures[curve].thick}`)
                    .attr("fill", function() { 
                        if (curveFeatures[curve].type == "margin") { 
                            return curveFeatures[curve].color
                        } else { return "none" }
                    })
                // retour à épaisseur normale des ticks de la légende
                legendContainer.select(`#leg-${curve}`).selectAll(".legendline")
                    .style("stroke", curveFeatures[curve].color)
                    .style("stroke-width", curveFeatures[curve].thick)
                legendContainer.select(`#leg-${curve}`).selectAll(".legendbullet")
                    .style("stroke", function() {
                        if (curveFeatures[curve].type == "margin") { return curveFeatures[curve].dashcolor }
                    })
                    .style("stroke-width", function() {
                        if (curveFeatures[curve].type == "margin") { return curveFeatures[curve].dashthick }
                    })
                // retour à la normale du texte de la légende
                legendContainer.select(`#leg-${curve}`).select("p").style("font-weight", "normal")
            }

        legendContainer.selectAll("li").on("pointerenter", (e) => {
            graphContainer.style("cursor", "pointer")
            hoverHide()
            curveThicken(e)
        })

        legendContainer.selectAll("li").on("pointerleave", (e) => {
            graphContainer.style("cursor", "default")
            curveSlim(e)
        })

        legendContainer.selectAll("li").on("pointerdown", (e) => {
            graphContainer.style("cursor", "pointer")
            const curve = e.currentTarget.id.slice(4)
            curveDisplayIndicator[`${curve}`] =  (curveDisplayIndicator[`${curve}`] + 1)%2
            hideOrDisplay(curve, curveDisplayIndicator[`${curve}`])

        })

    // ================================================
    //     Changement de taille de fenêtre
    // ================================================

        window.onresize = (event) => {
            graphDisplay()
            NScale = NScaleGenerator()
            sliderTrace(N, NScale)
            lightBarOff() 
            allTrace(tStart, tEnd, tLeft, tRight, tLeft0, tRight0)
            arrowTrace(hCursor*ratioCursorOff, panelColor.fill, 0.5)
            zoomTooltipTextCreate()
        }
