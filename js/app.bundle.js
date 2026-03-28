"use strict";(()=>{function B(P){return P==null?"":String(P).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ae(P,o){let I=null;function M(...X){I&&clearTimeout(I),I=setTimeout(()=>{I=null,P(...X)},o)}return M.cancel=()=>{I&&(clearTimeout(I),I=null)},M.pending=()=>I!==null,M}var zt=new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",minimumFractionDigits:0,maximumFractionDigits:0});var Tt={capitalRequerido:{min:0,max:99999999999,label:"Capital Requerido"},numTicketsMax:{min:1,max:1e5,label:"Total Tickets"},m2ComercialPB:{min:0,max:1e6,label:"M\xB2 Comercial"},rentaM2Comercial:{min:0,max:1e5,label:"Renta/M\xB2 Comercial"},m2HotelNivel1:{min:0,max:1e6,label:"M\xB2 Hotel N1"},rentaM2HotelNivel1:{min:0,max:1e5,label:"Renta/M\xB2 Hotel N1"},m2HotelNivel2:{min:0,max:1e6,label:"M\xB2 Hotel N2"},rentaM2HotelNivel2:{min:0,max:1e5,label:"Renta/M\xB2 Hotel N2"},capacidadEstacionamiento:{min:0,max:1e5,label:"Capacidad Estacionamiento"},cochesDiarios:{min:0,max:1e5,label:"Coches Diarios"},precioPorCoche:{min:0,max:1e4,label:"Precio por Coche"},valorFideicomiso:{min:0,max:99999999999,label:"Valor Fideicomiso"},costoFideicomisoMensual:{min:0,max:99999999,label:"Costo Fideicomiso Mensual"},aniosProyeccion:{min:1,max:20,label:"A\xF1os de Proyecci\xF3n"},inflacionAnualRentas:{min:0,max:50,label:"Inflaci\xF3n Anual"},costoAdminRentasPct:{min:0,max:100,label:"Costo Admin %"},pctTicketsModelo:{min:0,max:50,label:"% Tickets Modelo"},costoM2Construccion:{min:0,max:999999,label:"Costo M\xB2 Construcci\xF3n"},precioMercadoActualM2:{min:0,max:999999,label:"Precio Mercado M\xB2"},valorTerrenoAportado:{min:0,max:99999999999,label:"Valor Terreno"},precioTicketTerreno:{min:0,max:99999999,label:"Precio Ticket Terreno"},nominaAdmin:{min:0,max:99999999,label:"N\xF3mina Admin"},nominaVentas:{min:0,max:99999999,label:"N\xF3mina Ventas"},gastosContables:{min:0,max:99999999,label:"Gastos Contables"},gastosLegales:{min:0,max:99999999,label:"Gastos Legales"},rentaLugar:{min:0,max:99999999,label:"Renta Lugar"},gastosPublicidad:{min:0,max:99999999,label:"Publicidad"},gastosRepresentacion:{min:0,max:99999999,label:"Representaci\xF3n"},comisionVentasPct:{min:0,max:30,label:"Comisi\xF3n Ventas %"},mesesLevantamiento:{min:1,max:60,label:"Meses Levantamiento"},proyecto:{maxLength:200,type:"text",label:"Nombre del Proyecto"}};function xe(P,o,I){let M=Tt[P];if(!M)return{valid:!0};if(I||M.type==="text"){let L=String(o||"");return M.maxLength&&L.length>M.maxLength?{valid:!1,message:`${M.label}: m\xE1ximo ${M.maxLength} caracteres`}:{valid:!0}}let X=Number(o);return isNaN(X)?{valid:!1,message:`${M.label}: debe ser un n\xFAmero v\xE1lido`}:M.min!==void 0&&X<M.min?{valid:!1,message:`${M.label}: m\xEDnimo ${M.min}`,clamped:M.min}:M.max!==void 0&&X>M.max?{valid:!1,message:`${M.label}: m\xE1ximo ${M.max.toLocaleString()}`,clamped:M.max}:{valid:!0}}function le(P,o){P.style.borderColor="#E8A090",P.style.boxShadow="0 0 0 2px rgba(232,160,144,0.3)";let I=P.parentElement.querySelector(".input-error-msg");I&&I.remove();let M=document.createElement("div");M.className="input-error-msg",M.style.cssText="font-size:10px; color:#E8A090; margin-top:2px; font-weight:500;",M.textContent=o,P.parentElement.appendChild(M),setTimeout(()=>{P.style.borderColor="",P.style.boxShadow="",M.parentElement&&M.remove()},3e3)}function ge(P){P.style.borderColor="",P.style.boxShadow="";let o=P.parentElement.querySelector(".input-error-msg");o&&o.remove()}var ve=(()=>{let P={variables:{proyecto:"PUEBLO M\xC1GICO EL SALITRE",capitalRequerido:215e6,terreno:4e4,numTicketsMax:407,m2ComercialPB:3e3,rentaM2Comercial:450,m2HotelNivel1:3e3,rentaM2HotelNivel1:300,m2HotelNivel2:3e3,rentaM2HotelNivel2:250,m2Estacionamiento:6e3,capacidadEstacionamiento:270,cochesDiarios:350,precioPorCoche:70,valorFideicomiso:2e6,costoFideicomisoMensual:5e4,aniosProyeccion:10,inflacionAnualRentas:5,costoAdminRentasPct:12,pctTicketsModelo:20,costoM2Construccion:18e3,precioMercadoActualM2:48500,aportaTerreno:!0,valorTerrenoAportado:4e7,precioTicketTerreno:599e3,selectedPlusvaliaTicketIdx:0,activeReportTab:"ingresos",incluyeEstacionamiento:!0,ocupacionRentas:[60,75,90,...Array(17).fill(100)],ocupacionEstacionamiento:[60,75,90,...Array(17).fill(100)]},tickets:[{id:1,cantidad:50,precio:599999,nombre:"Fase Semilla",esAportado:!1},{id:2,cantidad:75,precio:699999,nombre:"Preventa Privada",esAportado:!1},{id:3,cantidad:75,precio:799999,nombre:"Oferta Primaria",esAportado:!1},{id:4,cantidad:30,precio:899999,nombre:"Oferta Secundaria",esAportado:!1},{id:5,cantidad:30,precio:999999,nombre:"Cierre de Emisi\xF3n",esAportado:!1},{id:6,cantidad:66,precio:599e3,nombre:"Capital Tierra",esAportado:!0,esTerrenoFijo:!0}],egresos:{nominaAdmin:8e4,nominaVentas:15e4,gastosContables:3e4,gastosLegales:6e4,rentaLugar:2e4,gastosPublicidad:15e4,gastosRepresentacion:5e4,acopOficina:15e4,acopMaqueta:12e4,acopRenders:8e4,acopFotos:3e4,acopMedia:12e4,comisionVentasPct:8,mesesLevantamiento:18},showroomItems:[{nombre:"Maqueta del Proyecto",cantidad:1,costo:15e4},{nombre:"Escritorios",cantidad:4,costo:8e3},{nombre:"Sillas de Oficina",cantidad:8,costo:3500},{nombre:"Cuadros / Arte Decorativo",cantidad:6,costo:7e3},{nombre:"Televisi\xF3n / Monitor",cantidad:2,costo:12e3},{nombre:"Archiveros",cantidad:2,costo:4500},{nombre:"Equipo de C\xF3mputo",cantidad:4,costo:18e3},{nombre:"Iluminaci\xF3n Decorativa",cantidad:1,costo:25e3},{nombre:"Sof\xE1s / Sala de Espera",cantidad:1,costo:7e4},{nombre:"Pantalla / Proyector",cantidad:1,costo:22e3},{nombre:"Se\xF1al\xE9tica y Branding",cantidad:1,costo:25e3},{nombre:"Menaje y Detalles",cantidad:1,costo:18e3}],obraItems:[{nombre:"Construcci\xF3n de Obra",cantidad:9e3,costo:18e3},{nombre:"Obra Exteriores",cantidad:2703,costo:3500},{nombre:"",cantidad:1,costo:0},{nombre:"",cantidad:1,costo:0},{nombre:"",cantidad:1,costo:0},{nombre:"",cantidad:1,costo:0},{nombre:"",cantidad:1,costo:0},{nombre:"",cantidad:1,costo:0},{nombre:"",cantidad:1,costo:0},{nombre:"",cantidad:1,costo:0}],inversionistas:[],pagos:[]},o={},I=[],M=null,X=0,L="viewer",re=null,oe=[],Z=[],G="dashboard",S=!1,W=[];function Ne(){W.forEach(a=>a.destroy()),W=[];let e=document.getElementById("chart-inventario"),t=document.getElementById("chart-ingresos");if(e){let a=(o.inversionistas||[]).reduce((c,p)=>c+(Number(p.tickets)||0),0),i=Number(o.variables.numTicketsMax)||0,l=o.tickets.filter(c=>c.esAportado).reduce((c,p)=>c+(Number(p.cantidad)||0),0)+Math.floor(i*(o.variables.pctTicketsModelo/100)),s=i-a-l;W.push(new Chart(e,{type:"doughnut",data:{labels:["Vendidos","Aportados","Disponibles"],datasets:[{data:[a,l,s],backgroundColor:["#3A1C15","#C5A059","#E5DED5"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:getComputedStyle(document.body).getPropertyValue("--text")}}}}}))}if(t){let a=o.variables,i=Number(a.m2ComercialPB)||0,l=Number(a.m2HotelNivel1)||0,s=Number(a.m2HotelNivel2)||0,c=i*(Number(a.rentaM2Comercial)||0),p=l*(Number(a.rentaM2HotelNivel1)||0),x=s*(Number(a.rentaM2HotelNivel2)||0),g=(Number(a.cochesDiarios)||350)*(Number(a.precioPorCoche)||50)*30;W.push(new Chart(t,{type:"bar",data:{labels:["Comercial","Hotel N1","Hotel N2","Estac."],datasets:[{label:"Ingreso Mensual",data:[c,p,x,g],backgroundColor:"#C5A059",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,grid:{color:getComputedStyle(document.body).getPropertyValue("--border")},ticks:{color:getComputedStyle(document.body).getPropertyValue("--text")}},x:{ticks:{color:getComputedStyle(document.body).getPropertyValue("--text")}}},plugins:{legend:{display:!1}}}}))}let r=document.getElementById("chart-proyeccion-10");if(r){let a=o.variables,i=Number(a.aniosProyeccion)||10,l=(Number(a.inflacionAnualRentas)||5)/100,s=Number(a.m2ComercialPB)||0,c=Number(a.m2HotelNivel1)||0,p=Number(a.m2HotelNivel2)||0,x=s*(Number(a.rentaM2Comercial)||0)+c*(Number(a.rentaM2HotelNivel1)||0)+p*(Number(a.rentaM2HotelNivel2)||0)+(Number(a.cochesDiarios)||350)*(Number(a.precioPorCoche)||50)*30,g=[],v=[],d=x*12;for(let b=1;b<=i;b++)g.push(`A\xF1o ${b}`),v.push(Math.round(d)),d*=1+l;W.push(new Chart(r,{type:"line",data:{labels:g,datasets:[{label:"Flujo de Caja Bruto Anual",data:v,borderColor:"#C5A059",backgroundColor:"rgba(197, 160, 89, 0.1)",fill:!0,tension:.4,pointBackgroundColor:"#3A1C15"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,grid:{color:getComputedStyle(document.body).getPropertyValue("--border")},ticks:{color:getComputedStyle(document.body).getPropertyValue("--text"),callback:b=>ce.format(b)}},x:{ticks:{color:getComputedStyle(document.body).getPropertyValue("--text")}}},plugins:{legend:{display:!1},tooltip:{callbacks:{label:b=>n(b.raw)}}}}}))}}let ce=new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",minimumFractionDigits:0,maximumFractionDigits:0}),n=e=>ce.format(e||0);function se(e){let t=document.getElementById("save-indicator");t||(t=document.createElement("div"),t.id="save-indicator",t.style.cssText="position:fixed;bottom:16px;right:16px;padding:6px 14px;border-radius:6px;font-size:11px;font-weight:600;z-index:9998;transition:opacity 0.3s;pointer-events:none;",document.body.appendChild(t)),e==="saving"?(t.textContent="Guardando...",t.style.background="rgba(197,160,89,0.9)",t.style.color="#fff",t.style.opacity="1"):e==="saved"?(t.textContent="\u2713 Guardado",t.style.background="rgba(46,204,113,0.9)",t.style.color="#fff",t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},1500)):e==="conflict"?(t.textContent="\u26A0 Conflicto \u2014 recargando",t.style.background="rgba(232,160,144,0.9)",t.style.color="#fff",t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},3e3)):e==="error"&&(t.textContent="\u2715 Error al guardar",t.style.background="rgba(232,160,144,0.9)",t.style.color="#fff",t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},3e3))}let Te=Ae(async()=>{se("saving");try{let e=await fetch("/api/state",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(e.status===409){se("conflict");let t=await e.json();t.serverState&&(o=t.serverState,localStorage.setItem("lyl_bienraiz_state",JSON.stringify(o)),$(G));return}if(e.ok){let t=await e.json();t._version!==void 0&&(o._version=t._version,localStorage.setItem("lyl_bienraiz_state",JSON.stringify(o))),se("saved")}else se("error")}catch{}},1e3);function F(){L!=="viewer"&&(localStorage.setItem("lyl_bienraiz_state",JSON.stringify(o)),Te())}async function fe(){(localStorage.getItem("lyl_theme")||"light")==="dark"&&document.body.classList.add("dark-mode");try{let r=await(await fetch("/api/state")).json();if(r.state)return localStorage.setItem("lyl_bienraiz_state",JSON.stringify(r.state)),r.state}catch{}try{let t=localStorage.getItem("lyl_bienraiz_state");return(t?JSON.parse(t):null)||JSON.parse(JSON.stringify(P))}catch{return JSON.parse(JSON.stringify(P))}}async function be(){try{let t=await(await fetch("/api/escenarios")).json();if(Array.isArray(t.escenarios))return localStorage.setItem("lil_escenarios_db",JSON.stringify(t.escenarios)),t.escenarios}catch{}try{return JSON.parse(localStorage.getItem("lil_escenarios_db")||"[]")}catch{return[]}}function pe(){localStorage.setItem("lil_users_db",JSON.stringify(Z)),fetch("/api/users/sync",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({users:Z})}).catch(()=>{})}async function Ee(){try{let e=await fetch("/api/users");if(e.ok){let t=await e.json();if(Array.isArray(t.users))return localStorage.setItem("lil_users_db",JSON.stringify(t.users)),t.users}}catch{}try{let e=localStorage.getItem("lil_users_db");if(e)return JSON.parse(e)}catch{}try{let e=await fetch("data/users.json");if(e.ok){let t=await e.json();if(Array.isArray(t))return t.map(r=>({id:r.id,name:r.name,email:r.email,role:r.role}))}}catch{}return[]}function Pe(){let e=o.variables,t=o.egresos,r=Number(e.capitalRequerido)||0,a=e.pctTicketsModelo||0,i=Number(e.numTicketsMax)||1,l=Math.floor(i*(a/100)),s=o.tickets.reduce((u,E)=>u+(Number(E.cantidad)||0)*(Number(E.precio)||0),0),c=(o.pagos||[]).reduce((u,E)=>u+(Number(E.monto)||0),0),p=o.pagos&&o.pagos.length>0?c:s,x=o.tickets.reduce((u,E)=>u+(Number(E.cantidad)||0),0),g=x+l,v=r>0?p/r*100:0,b=(o.inversionistas||[]).reduce((u,E)=>u+(Number(E.tickets)||0),0),f=o.tickets.filter(u=>u.esAportado).reduce((u,E)=>u+(Number(E.cantidad)||0),0)+l,y=i-b-f,_=Number(e.m2ComercialPB)||0,O=Number(e.m2HotelNivel1)||0,m=Number(e.m2HotelNivel2)||0,w=_+O+m,N=i>0?w/i:0,C=_*(Number(e.rentaM2Comercial)||0)+O*(Number(e.rentaM2HotelNivel1)||0)+m*(Number(e.rentaM2HotelNivel2)||0),T=e.incluyeEstacionamiento!==!1?(Number(e.cochesDiarios)||350)*(Number(e.precioPorCoche)||50)*30:0,h=C+T,A=h*12,z=Number(t.mesesLevantamiento)||24,R=((t.nominaAdmin||0)+(t.nominaVentas||0)+(t.gastosContables||0)+(t.gastosLegales||0)+(t.rentaLugar||0)+(t.gastosPublicidad||0)+(t.gastosRepresentacion||0))*z,V=o.tickets.filter(u=>!u.esAportado).reduce((u,E)=>u+(Number(E.cantidad)||0)*(Number(E.precio)||0),0)*((t.comisionVentasPct||0)/100),J=(t.acopOficina||0)+(t.acopMaqueta||0)+(t.acopRenders||0)+(t.acopFotos||0)+(t.acopMedia||0),Y=e.aportaTerreno?o.tickets.filter(u=>u.esAportado).reduce((u,E)=>u+(Number(E.cantidad)||0)*(Number(E.precio)||0),0):Number(e.costoCompraTerreno)||0,U=R+J+V+Y,q=p-U,K=(o.obraItems||[]).reduce((u,E)=>u+Number(E.cantidad)*Number(E.costo),0),Q=q-K,ae=p>0?A/p*100:0,de=r>0?q/r*100:0,H=(u,E,ee,ie,ue,te)=>`<div class="card animate-scale ${ie.includes("status")?ie:""}" style="padding:20px; border-top:3px solid ${ue}; transition: transform 0.3s ease;" ${te?`data-tooltip="${te}"`:""}>
        <div class="kpi-label">${u} ${te?'<span class="info-icon">i</span>':""}</div>
        <div style="font-size:22px; font-weight:700; color:${ie.startsWith("status")?"inherit":ie}; line-height:1.2;">${E}</div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:6px;">${ee}</div>
      </div>`,me=X;return setTimeout(()=>{X===me&&Ne()},50),`
    <div class="section-header">
      <div>
        <div class="section-title">Dashboard</div>
        <div class="section-sub">${B(e.proyecto)}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px; font-weight:600; color:var(--navy);">${g} / ${i} tickets emitidos</div>
        <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">${x} venta + ${l} asignaci\xF3n modelo</div>
      </div>
    </div>

    // KPIs principales
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:20px;">
      ${H("Meta de Capital",n(r),"Objetivo de levantamiento","var(--navy)","#C5A059","Monto total de inversi\xF3n necesaria para el proyecto.")}
      ${H("Entradas Proyectadas",n(p),`<span style="font-weight:700; color:${v>=100?"#2ecc71":"#C5A059"};">${v.toFixed(1)}%</span> de la meta cubierto`,"#2ecc71","#2ecc71","Capital total comprometido por los inversionistas a la fecha.")}
      ${H("Egresos de Levantamiento",n(U),`Fijos ${z} meses + comisiones + acop.`,"#E8A090","#E8A090","Gastos operativos, comerciales y de preventa.")}
      ${H("Capital Neto a Obra",n(q),`${de.toFixed(1)}% del objetivo disponible`,q>=r*.8?"var(--navy)":"#C5A059","var(--navy)","Capital remanente para construcci\xF3n despu\xE9s de egresos.")}
    </div>

    <!-- Indicadores de Inventario de Tickets -->
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:20px;">
      ${H("Tickets Vendidos",b,"Venta real v\xEDa Ledger","var(--navy)","var(--navy)","Suma de tickets asignados a inversionistas reales.")}
      ${H("Tickets Disponibles",y,`${(y/i*100).toFixed(1)}% del inventario`,y>50?"status-high":"status-mid","#C5A059","Tickets a\xFAn no asignados ni vendidos.")}
      ${H("Tickets Aportados",f,"Reserva / Capital Tierra","#95a5a6","#95a5a6","Tickets reservados para aportaciones fijas o socios fundadores.")}
      ${H("Total de Tickets",i,"Emisi\xF3n total autorizada","#7f8c8d","#C5A059","Capacidad nominal m\xE1xima del proyecto.")}
    </div>

    <!-- KPIs de Rendimiento -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:20px;">
      ${H("Cap Rate Bruto Anual",`${ae.toFixed(2)}%`,"Ingreso anual \xF7 capital captado",ae>8?"status-high":ae>5?"status-mid":"status-low","#C5A059","Tasa de capitalizaci\xF3n: Eficiencia del activo para generar rentas. Ideal > 8%")}
      ${H("Equivalencia F\xEDsica",`${22.5.toFixed(1)} m\xB2`,"9,000 m\xB2 rentables totales","var(--navy)","#C5A059","Metros cuadrados proporcionales por ticket de inversi\xF3n.")}
      ${H("Ingreso Mensual Pool",n(e.ingresoMensualNeto||0),e.incluyeEstacionamiento!==!1?"Rentas + estacionamiento":"Rentas",e.ingresoMensualNeto>4e6?"status-high":"var(--navy)","#C5A059","Flujo de caja neto estimado repartible mensualmente.")}
    </div>

    <!-- Barra de progreso -->
    <div class="card" style="padding:16px 24px; margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:12px; font-weight:600; color:var(--navy);">Progreso de Levantamiento</span>
        <span style="font-size:13px; font-weight:700; color:${v>=100?"#2ecc71":"#C5A059"};">${v.toFixed(1)}% \u2014 ${n(p)} de ${n(r)}</span>
      </div>
      <div style="height:10px; background:#f0f4f8; border-radius:5px; overflow:hidden;">
        <div style="height:100%; width:${Math.min(100,v)}%; background:${v>=100?"#2ecc71":"linear-gradient(90deg,#C5A059,#e8c870)"}; border-radius:5px; transition:width 0.5s;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; margin-top:6px; font-size:10px; color:var(--text-muted);">
        <span>$0</span><span>${n(r*.25)}</span><span>${n(r*.5)}</span><span>${n(r*.75)}</span><span>${n(r)}</span>
      </div>
    </div>

    <!-- M\xE9tricas operativas -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:20px;">
      <div class="card" style="padding:20px; display:flex; align-items:center; gap:16px;">
        <div style="width:48px; height:48px; background:rgba(46,204,113,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:#2ecc71; flex-shrink:0;">%</div>
        <div>
          <div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:4px;">Cap Rate Bruto Anual</div>
          <div style="font-size:22px; font-weight:700; color:${ae>10?"#2ecc71":"var(--navy)"};">${ae.toFixed(2)}%</div>
          <div style="font-size:11px; color:var(--text-muted);">Ingreso anual \xF7 capital captado</div>
        </div>
      </div>
      <div class="card" style="padding:20px; display:flex; align-items:center; gap:16px;">
        <div style="width:48px; height:48px; background:rgba(197,160,89,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:#C5A059; flex-shrink:0;">m\xB2</div>
        <div>
          <div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:4px;">Equivalencia F\xEDsica / Ticket</div>
          <div style="font-size:22px; font-weight:700; color:var(--navy);">${N.toFixed(1)} m\xB2</div>
          <div style="font-size:11px; color:var(--text-muted);">${w.toLocaleString()} m\xB2 rentables totales</div>
        </div>
      </div>
      <div class="card" style="padding:20px; display:flex; align-items:center; gap:16px;">
        <div style="width:48px; height:48px; background:rgba(30,61,89,0.08); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:var(--navy); flex-shrink:0;">$</div>
        <div>
          <div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:4px;">Ingreso Mensual Pool</div>
          <div style="font-size:22px; font-weight:700; color:var(--navy);">${n(h)}</div>
          <div style="font-size:11px; color:var(--text-muted);">${e.incluyeEstacionamiento!==!1?"Rentas + estacionamiento":"Rentas"}</div>
        </div>
      </div>
    </div>

    <!-- Resumen Financiero Maestro -->
    <div class="card" style="padding:0; overflow:hidden; margin-bottom:20px; border:2px solid var(--navy); box-shadow:0 8px 32px rgba(30,41,59,0.15);">
      <div style="background:var(--navy); padding:18px 28px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:16px; font-weight:700; color:#C5A059; letter-spacing:1px;">RESUMEN FINANCIERO DEL PROYECTO</div>
          <div style="font-size:11px; color:rgba(255,255,255,0.5); margin-top:2px;">Destino completo del capital captado \xB7 Incluye costo de obra</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px; color:rgba(255,255,255,0.5); margin-bottom:2px;">Remanente Final</div>
          <div style="font-size:28px; font-weight:700; color:${Q>=0?"#2ecc71":"#E8A090"}; line-height:1;">${Q>=0?"+":""}${n(Q)}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0;">

        <!-- Columna izquierda: fases de levantamiento -->
        <div style="border-right:1px solid #eee;">
          <div style="padding:12px 20px; background:#f9fbfd; border-bottom:1px solid #eee;">
            <span style="font-size:11px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:1px;">Fases de Levantamiento</span>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:12px;">
            <thead>
              <tr style="border-bottom:1px solid #eee; color:var(--text-muted);">
                <th style="padding:7px 16px; text-align:left; font-weight:500;">Fase</th>
                <th style="padding:7px 8px; text-align:center; font-weight:500;">Tickets</th>
                <th style="padding:7px 16px; text-align:right; font-weight:500;">Precio</th>
                <th style="padding:7px 16px; text-align:right; font-weight:500;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${o.tickets.map(u=>{let E=(Number(u.cantidad)||0)*(Number(u.precio)||0);return`<tr style="border-bottom:1px solid #f5f5f5;">
                  <td style="padding:8px 16px; color:var(--navy); font-weight:500;">${B(u.nombre)}</td>
                  <td style="padding:8px 8px; text-align:center; color:var(--text-muted);">${u.cantidad}</td>
                  <td style="padding:8px 16px; text-align:right; color:var(--text-muted);">${n(u.precio)}</td>
                  <td style="padding:8px 16px; text-align:right; font-weight:600; color:var(--navy);">${n(E)}</td>
                </tr>`}).join("")}
            </tbody>
            <tfoot>
              <tr style="background:#f9fbfd; border-top:2px solid #eee;">
                <td colspan="3" style="padding:11px 16px; font-weight:700; color:var(--navy);">Total Captado</td>
                <td style="padding:11px 16px; text-align:right; font-weight:700; color:#2ecc71; font-size:14px;">${n(p)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Columna derecha: destino del capital -->
        <div>
          <div style="padding:12px 20px; background:#f9fbfd; border-bottom:1px solid #eee;">
            <span style="font-size:11px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:1px;">Destino del Capital</span>
          </div>
          <div style="padding:8px 24px;">
            ${[{label:"Entradas Brutas",val:p,color:"#2ecc71",icon:"+",bold:!1},...Y>0?[{label:e.aportaTerreno?"Terreno (Aportaci\xF3n)":"Compra de Terreno",val:-Y,color:"#E8A090",icon:"\u2013",bold:!1}]:[],{label:`N\xF3mina y Operativos (${z} meses)`,val:-R,color:"#E8A090",icon:"\u2013",bold:!1},{label:"Comisiones de Venta",val:-V,color:"#E8A090",icon:"\u2013",bold:!1},{label:"Acoplamiento Preoperativo",val:-J,color:"#E8A090",icon:"\u2013",bold:!1},{label:"Capital Neto para Obra",val:q,color:"var(--navy)",icon:"=",bold:!0,sep:!0},{label:"Costo de Obra Civil",val:-K,color:"#E8A090",icon:"\u2013",bold:!1},{label:"Remanente Final del Proyecto",val:Q,color:Q>=0?"#2ecc71":"#E8A090",icon:"=",bold:!0,final:!0}].map((u,E,ee)=>`
              <div style="display:flex; justify-content:space-between; align-items:center;
                padding:${u.final?"14px 0 10px":"9px 0"};
                ${u.final?"border-top:3px solid var(--navy); margin-top:6px;":u.sep?"border-top:2px solid #eee; border-bottom:2px solid #eee; margin:4px 0; padding:10px 0;":"border-bottom:1px solid #f5f5f5;"}">
                <span style="font-size:${u.final?"13px":"12px"}; color:${u.final?"var(--navy)":"var(--text-muted)"}; font-weight:${u.bold?"700":"400"};">
                  <span style="font-size:${u.final?"16px":"14px"}; font-weight:700; color:${u.color}; margin-right:8px; font-family:monospace;">${u.icon}</span>${u.label}
                </span>
                <span style="font-size:${u.final?"18px":"13px"}; font-weight:${u.bold?"700":"600"}; color:${u.color};">${n(Math.abs(u.val))}</span>
              </div>`).join("")}
          </div>
        </div>

      </div>
    </div>

    <!-- Gr\xE1ficos Interactivos -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
      <div class="card animate-scale" style="padding:24px; height:350px;">
        <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Distribuci\xF3n de Inventario (Tickets)</div>
        <div style="flex:1; position:relative; min-height:0;">
          <canvas id="chart-inventario"></canvas>
        </div>
      </div>
      <div class="card animate-scale" style="padding:24px; height:350px;">
        <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Ingresos Operativos por Fuente</div>
        <div style="flex:1; position:relative; min-height:0;">
          <canvas id="chart-ingresos"></canvas>
        </div>
      </div>
    </div>

    <div class="card animate-scale" style="padding:24px; height:350px; margin-bottom:20px;">
      <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Proyecci\xF3n de Flujo de Caja Bruto (A\xF1os 1-${o.variables.aniosProyeccion||10})</div>
      <div style="flex:1; position:relative; min-height:0;">
        <canvas id="chart-proyeccion-10"></canvas>
      </div>
    </div>

    <!-- Ingreso operativo por fuente -->
    <div class="card" style="padding:24px;">
      <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Desglose de Ingreso Operativo Mensual</div>
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
        ${[{label:"Comercial PB",m2:_,renta:Number(e.rentaM2Comercial)||0,color:"#C5A059"},{label:"Hotel Nivel 1",m2:O,renta:Number(e.rentaM2HotelNivel1)||0,color:"#8B4513"},{label:"Hotel Nivel 2",m2:m,renta:Number(e.rentaM2HotelNivel2)||0,color:"#8e24aa"},{label:"Estacionamiento",m2:0,renta:0,ingreso:T,color:"#2ecc71"}].map(u=>{let E=u.ingreso!==void 0?u.ingreso:u.m2*u.renta;return`<div style="background:#f9fbfd; border-radius:6px; padding:14px; border-left:3px solid ${u.color};">
            <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:6px;">${u.label}</div>
            <div style="font-size:18px; font-weight:700; color:var(--navy);">${n(E)}</div>
            ${u.m2>0?`<div style="font-size:10px; color:var(--text-muted); margin-top:4px;">${u.m2.toLocaleString()} m\xB2 \xD7 ${n(u.renta)}/m\xB2</div>`:'<div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Concesi\xF3n operativa diaria</div>'}
          </div>`}).join("")}
      </div>
      <div style="margin-top:12px; display:flex; justify-content:flex-end; align-items:center; gap:16px;">
        <span style="font-size:12px; color:var(--text-muted);">Total mensual:</span>
        <span style="font-size:20px; font-weight:700; color:var(--navy);">${n(h)}</span>
        <span style="font-size:12px; color:var(--text-muted);">\u2192 Anual:</span>
        <span style="font-size:20px; font-weight:700; color:#2ecc71;">${n(A)}</span>
      </div>
    </div>

    <!-- Plusval\xEDa Especulativa por Fase -->
    ${(()=>{let u=Number(e.precioMercadoActualM2)||48500,E=N*u;return`<div class="card" style="padding:24px; margin-top:20px; border-top:3px solid #2ecc71;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:13px; font-weight:600; color:var(--navy);">Proyecci\xF3n de Plusval\xEDa Especulativa por Fase</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
              Equivalencia f\xEDsica: <strong>${N.toFixed(2)} m\xB2/ticket</strong> \xD7
              <strong>${n(u)}/m\xB2</strong> = Valor comercial estimado <strong style="color:#2ecc71;">${n(E)}</strong>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:11px; color:var(--text-muted);">Precio/m\xB2 mercado actual:</span>
            <input type="text" class="form-input" style="width:110px; border:1px solid #2ecc71; padding:5px 8px; border-radius:4px; font-size:14px; font-weight:700; color:#2ecc71; text-align:center;"
              value="${n(e.precioMercadoActualM2)}" data-key="precioMercadoActualM2" data-nested="variables">
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px;">
          ${o.tickets.map(ee=>{let ie=E-Number(ee.precio),ue=Number(ee.precio)>0?(E/Number(ee.precio)-1)*100:0,te=ie>0;return`<div style="background:#f9fbfd; border-radius:8px; padding:14px; text-align:center; border-bottom:3px solid ${te?"#2ecc71":"#E8A090"}; ${ee.esAportado?"opacity:0.75;":""}">
              <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px; line-height:1.3;">${B(ee.nombre)}</div>
              <div style="font-size:12px; font-weight:600; color:var(--navy); margin-bottom:8px;">${n(ee.precio)}</div>
              <div style="font-size:22px; font-weight:700; color:${te?"#2ecc71":"#E8A090"}; line-height:1;">${te?"+":""}${ue.toFixed(1)}%</div>
              <div style="font-size:11px; color:${te?"#2ecc71":"#E8A090"}; margin-top:4px;">${te?"+":""}${n(ie)}</div>
            </div>`}).join("")}
        </div>
      </div>`})()}
`}function ze(){let e=o.variables,t=e.activeParamTab||"generales",r=Number(e.aniosProyeccion)||10,a=Number(e.inflacionAnualRentas)||5,i=Number(e.costoAdminRentasPct)||8.9,l=c=>t===c?"padding:12px 24px; font-weight:600; color:var(--navy); border-bottom:2px solid var(--navy); cursor:pointer; background:rgba(30, 61, 89, 0.05); white-space:nowrap;":"padding:12px 24px; font-weight:500; color:var(--text-muted); border-bottom:2px solid transparent; cursor:pointer; white-space:nowrap;",s=`<div class="section-header">
      <div>
        <div class="section-title">Par\xE1metros Base</div>
        <div class="section-sub">Configuraci\xF3n inicial del desarrollo inmobiliario</div>
      </div>
    </div>
    <div class="card" style="padding:0; overflow:hidden;">
      <div style="display:flex; border-bottom:1px solid #eee; background:#f9fbfd; font-size:13px; overflow-x:auto;">
        <div style="${l("generales")}" onclick="App.switchParamTab('generales')">Datos Generales</div>
        <div style="${l("rentas")}" onclick="App.switchParamTab('rentas')">Distribuci\xF3n Rentable y Tarifas</div>
        <div style="${l("estacionamiento")}" onclick="App.switchParamTab('estacionamiento')">Estacionamiento</div>
        <div style="${l("fiduciaria")}" onclick="App.switchParamTab('fiduciaria')">Estructura Fiduciaria</div>
      </div>
      <div style="padding:24px;">`;if(t==="generales"){let c=o.egresos,p=Number(c.comisionVentasPct)||0,x=p/30*100,g=o.tickets.filter(d=>!d.esAportado).reduce((d,b)=>d+Number(b.cantidad)*Number(b.precio),0),v=g*(p/100);s+=`
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Datos Generales</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Nombre del Proyecto</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${e.proyecto}" data-key="proyecto" data-nested="variables" data-is-text="true">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Capital Requerido Target</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${n(e.capitalRequerido)}" data-key="capitalRequerido" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Total Tickets Emitidos (Max)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${e.numTicketsMax}" data-key="numTicketsMax" data-nested="variables">
        </div>
      </div>

      <div style="margin-top:28px; padding:20px; background:#f9fbfd; border-radius:8px; border:1px solid #e1e8ed;">
        <h3 style="font-size:13px; color:var(--navy); margin-bottom:16px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">
          Comisi\xF3n de Ventas de Tickets
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:center;">
          <div>
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>% Comisi\xF3n sobre Tickets Vendidos</span>
              <span id="val-comisionVentasPct" style="font-weight:600; color:var(--navy);">${p}%</span>
            </label>
            <div class="range-container">
              <input type="range" class="form-input" min="0" max="30" step="0.5" style="width:100%;"
                value="${p}" data-key="comisionVentasPct" data-nested="egresos">
              <output class="range-bubble" id="bubble-comisionVentasPct" style="left:calc(${x}% + ${12-x*.24}px)">${p}%</output>
            </div>
            <p style="font-size:11px; color:var(--text-muted); margin-top:8px; line-height:1.5;">
              Aplica <strong>solo sobre tickets marcados como Venta</strong> en la Estrategia de Tickets. No incluye tickets de Aportaci\xF3n ni del Modelo.
            </p>
          </div>
          <div style="background:white; border:1px solid #e1e8ed; border-radius:6px; padding:16px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:8px; color:var(--text-muted);">
              <span>Base de C\xE1lculo (tickets vendidos):</span>
              <strong style="color:var(--navy);">${n(g)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:8px; color:var(--text-muted);">
              <span>Porcentaje aplicado:</span>
              <strong style="color:var(--navy);">${p}%</strong>
            </div>
            <div style="border-top:1px solid #eee; padding-top:8px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12px; font-weight:600; color:var(--text-muted);">Comisi\xF3n Total Estimada:</span>
              <span style="font-size:18px; font-weight:700; color:#C5A059;">${n(v)}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:28px; padding:20px; background:#f9fbfd; border-radius:8px; border:1px solid #e1e8ed;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:${e.aportaTerreno?"20px":"0"};">
          <div>
            <h3 style="font-size:13px; color:var(--navy); margin:0; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Aportaci\xF3n de Terreno</h3>
            <p style="font-size:11px; color:var(--text-muted); margin:4px 0 0;">Cuando el terreno se aporta, su valor se convierte en tickets fijos que no requieren levantamiento de capital.</p>
          </div>
          <button onclick="App.toggleAportaTerreno()"
            style="padding:8px 20px; border-radius:20px; border:2px solid ${e.aportaTerreno?"#C5A059":"#cbd5e1"}; background:${e.aportaTerreno?"rgba(197,160,89,0.1)":"white"}; color:${e.aportaTerreno?"#C5A059":"var(--text-muted)"}; font-weight:700; font-size:13px; cursor:pointer; white-space:nowrap;">
            ${e.aportaTerreno?"\u{1F512} Aportado \u2014 ON":"OFF"}
          </button>
        </div>
        ${e.aportaTerreno?`
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; align-items:end;">
          <div>
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Valor del Terreno Aportado</label>
            <input type="text" class="form-input" style="width:100%; border:1px solid #C5A059; padding:8px; border-radius:4px; font-size:15px; font-weight:600; color:var(--navy);"
              value="${n(e.valorTerrenoAportado)}" data-key="valorTerrenoAportado" data-nested="variables">
          </div>
          <div>
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Precio por Ticket de Aportaci\xF3n</label>
            <input type="text" class="form-input" style="width:100%; border:1px solid #C5A059; padding:8px; border-radius:4px; font-size:15px; font-weight:600; color:var(--navy);"
              value="${n(e.precioTicketTerreno)}" data-key="precioTicketTerreno" data-nested="variables">
          </div>
          <div style="padding:10px 14px; background:rgba(197,160,89,0.08); border-radius:6px; border:1px dashed #C5A059; text-align:center;">
            <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Tickets de Terreno</div>
            <div style="font-size:22px; font-weight:700; color:#C5A059;">${Math.floor((Number(e.valorTerrenoAportado)||36e6)/(Number(e.precioTicketTerreno)||36e4))}</div>
            <div style="font-size:10px; color:var(--text-muted);">tickets fijos (Capital Tierra)</div>
          </div>
        </div>`:""}
      </div>`}else if(t==="rentas"){let c=(r-1)/19*100,p=a/20*100,x=i/30*100;s+=`
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Distribuci\xF3n Rentable y Tarifas Base</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">M\xB2 Comercial (Planta Baja)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${e.m2ComercialPB}" data-key="m2ComercialPB" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta Mensual por M\xB2 (Comercial)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${n(e.rentaM2Comercial)}" data-key="rentaM2Comercial" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">M\xB2 Hotel (Nivel 1)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${e.m2HotelNivel1}" data-key="m2HotelNivel1" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta Mensual por M\xB2 (Nivel 1)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${n(e.rentaM2HotelNivel1)}" data-key="rentaM2HotelNivel1" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">M\xB2 Hotel (Nivel 2)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${e.m2HotelNivel2}" data-key="m2HotelNivel2" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta Mensual por M\xB2 (Nivel 2)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${n(e.rentaM2HotelNivel2)}" data-key="rentaM2HotelNivel2" data-nested="variables">
        </div>
      </div>
      <h3 style="font-size:14px; color:var(--navy); margin-top:32px; margin-bottom:16px; font-weight:500">Variables de Proyecci\xF3n Financiera</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>A\xF1os de Proyecci\xF3n</span>
            <span id="val-aniosProyeccion" style="font-weight:600; color:var(--navy);">${r} A\xF1os</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="1" max="20" step="1" style="width:100%;"
              value="${r}" data-key="aniosProyeccion" data-nested="variables">
            <output class="range-bubble" id="bubble-aniosProyeccion" style="left:calc(${c}% + ${12-c*.24}px)">${r} A\xF1os</output>
          </div>
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>Inflaci\xF3n Anual Estimada</span>
            <span id="val-inflacionAnualRentas" style="font-weight:600; color:var(--navy);">${a}%</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="0" max="20" step="0.1" style="width:100%;"
              value="${a}" data-key="inflacionAnualRentas" data-nested="variables">
            <output class="range-bubble" id="bubble-inflacionAnualRentas" style="left:calc(${p}% + ${12-p*.24}px)">${a}%</output>
          </div>
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>Costo Admin. de Rentas</span>
            <span id="val-costoAdminRentasPct" style="font-weight:600; color:var(--navy);">${i}%</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="0" max="30" step="0.1" style="width:100%;"
              value="${i}" data-key="costoAdminRentasPct" data-nested="variables">
            <output class="range-bubble" id="bubble-costoAdminRentasPct" style="left:calc(${x}% + ${12-x*.24}px)">${i}%</output>
          </div>
        </div>
      </div>`}else if(t==="estacionamiento"){let c=Number(e.cochesDiarios)||350,p=Number(e.precioPorCoche)||50,x=Number(e.capacidadEstacionamiento)||270,g=e.incluyeEstacionamiento!==!1;s+=`
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Par\xE1metros de Estacionamiento Operativo (Concesi\xF3n)</h3>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:${g?"20px":"0"};">
        <span style="font-size:12px; color:var(--text-muted);">\xBFEste proyecto incluye ingresos por estacionamiento?</span>
        <button onclick="App.toggleIncluyeEstacionamiento()"
          style="padding:8px 20px; border-radius:20px; border:2px solid ${g?"#C5A059":"#cbd5e1"}; background:${g?"rgba(197,160,89,0.1)":"white"}; color:${g?"#C5A059":"var(--text-muted)"}; font-weight:700; font-size:13px; cursor:pointer; white-space:nowrap;">
          ${g?"\u2713 Incluye estacionamiento":"No incluye estacionamiento"}
        </button>
      </div>
      ${g?`
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Capacidad Total de Coches (Cajones)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${x}" data-key="capacidadEstacionamiento" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Cantidad Estimada Diaria (Rotaci\xF3n)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${c}" data-key="cochesDiarios" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Ticket Promedio por Boleto (MXN)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${n(p)}" data-key="precioPorCoche" data-nested="variables">
        </div>
      </div>
      <div style="margin-top:16px; padding:14px 20px; background:#f9fbfd; border-radius:6px; display:inline-flex; align-items:center; gap:12px; border:1px dashed #C5A059;">
        <span style="font-size:12px; color:var(--navy); font-weight:600;">Ingreso Bruto Mensual Estimado:</span>
        <span style="font-size:16px; color:#2ecc71; font-weight:700;">${n(c*p*30)}</span>
        <span style="font-size:11px; color:var(--text-muted);">(${c} coches \xD7 ${n(p)} \xD7 30 d\xEDas)</span>
      </div>`:`
      <div style="margin-top:16px; padding:14px 20px; background:#f9fbfd; border-radius:6px; border:1px dashed #cbd5e1; color:var(--text-muted); font-size:13px;">
        El ingreso por estacionamiento est\xE1 excluido del modelo. Todos los c\xE1lculos usan $0 para este concepto.
      </div>`}`}else t==="fiduciaria"&&(s+=`
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Estructura Fiduciaria</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Valor M\xEDnimo del Fideicomiso</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${n(e.valorFideicomiso)}" data-key="valorFideicomiso" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Costo Mensual Fideicomiso</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${n(e.costoFideicomisoMensual)}" data-key="costoFideicomisoMensual" data-nested="variables">
        </div>
      </div>`);return s+="</div></div>",s}function Me(){let e=o.tickets.reduce((h,A)=>h+(Number(A.cantidad)||0),0),t=o.variables.numTicketsMax,r=o.variables.pctTicketsModelo||0,a=Math.floor(t*(r/100)),i=t-a,l=i-e,s=`<div class="section-header">
      <div>
        <div class="section-title">Estrategia de Tickets (Venta vs Asignaci\xF3n)</div>
        <div class="section-sub">Configuraci\xF3n de Venta Limitada a ${i} tickets (excluyendo asignaci\xF3n del modelo)</div>
      </div>
      <div style="text-align:right;">
        <span style="display:block; font-size:12px; font-weight:600; color: ${l<0?"#E8A090":"var(--navy)"};">
          Tickets Emitidos Totales (Venta + Modelo): ${e+a} / ${t}
        </span>
        <span style="font-size:10px; color:var(--text-muted); margin-top:4px; display:block;">(${a} modelo + ${e} venta configurada) | Restan ${l} para emitir</span>
      </div>
    </div>
    
    <div class="card" style="padding:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h3 style="font-size:14px; color:var(--navy); font-weight:500;">Fases de Levantamiento</h3>
        <button onclick="App.addTicketTier()" style="background:var(--navy); color:white; border:none; padding:6px 12px; border-radius:4px; font-size:11px; cursor:pointer;">+ Agregar Fase</button>
      </div>
      
      <table style="width:100%; text-align:left; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="border-bottom:1px solid #eee; color:var(--text-muted);">
            <th style="padding:8px 4px; font-weight:500;">Fase</th>
            <th style="padding:8px 4px; font-weight:500; text-align:center;">Tickets</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Precio Ticket</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Valor m\xB2 (Compra)</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Valor Comercial (QRO)</th>
            <th style="padding:8px 12px; font-weight:500; text-align:right;">Margen Plusval\xEDa</th>
            <th style="padding:8px 12px; font-weight:500; text-align:right;">Cap Rate</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Subtotal</th>
            <th style="padding:8px 4px;"></th>
          </tr>
        </thead>
        <tbody>`,c=0,p=Number(o.variables.m2ComercialPB)||0,x=Number(o.variables.rentaM2Comercial)||0,g=Number(o.variables.m2HotelNivel1)||0,v=Number(o.variables.rentaM2HotelNivel1)||0,d=Number(o.variables.m2HotelNivel2)||0,b=Number(o.variables.rentaM2HotelNivel2)||0,k=p+g+d,f=p*x+g*v+d*b,y=(Number(o.variables.cochesDiarios)||350)*(Number(o.variables.precioPorCoche)||50)*30,O=(f+y)*12,m=Number(o.variables.numTicketsMax)||1,w=m>0?k/m:0,N=m>0?O/m:0,C={"Fase Semilla":"Fase Semilla (Founders & partners): Suena a capital de riesgo exclusivo para el c\xEDrculo interno.","Preventa Privada":"Preventa Privada (Pre-desarrollo): Mantiene la exclusividad antes de salir al p\xFAblico general, ligada a la etapa de licencias.","Oferta Primaria":"Oferta Primaria (Arranque de obra): T\xE9rmino burs\xE1til/institucional que marca el inicio p\xFAblico cuando se mueve la tierra.","Oferta Secundaria":"Oferta Secundaria (Consolidaci\xF3n estructural): Denota que el activo ya est\xE1 tomando forma f\xEDsica (bajo riesgo) y se abre una nueva ventana de inversi\xF3n.","Cierre de Emisi\xF3n":"Cierre de Emisi\xF3n (Pre-apertura comercial): Genera sentido de urgencia m\xE1xima; es la \xFAltima oportunidad de entrar antes de que el negocio empiece a operar y generar flujo.","Capital Tierra":"Capital Tierra (Aportaci\xF3n patrimonial): Le da un trato de socio estrat\xE9gico al aportante del terreno, separ\xE1ndolo del inversionista l\xEDquido."};s+=`
        <tr style="border-bottom:1px solid #f5f5f5; background:#fbfcfe;">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:var(--text-muted); width:16px; min-width:16px; text-align:right;">-</span>
                <input type="text" class="form-input ticket-input" style="width:100%; border:1px solid #ddd; padding:6px; border-radius:4px; color:#C5A059; font-weight:600; background:#f9fbfd;" 
                  value="Participaci\xF3n del Modelo" disabled>
                <div onclick="this.parentElement.nextElementSibling.style.display = this.parentElement.nextElementSibling.style.display === 'none' ? 'block' : 'none'" style="width:22px; height:22px; border-radius:50%; background:rgba(197, 160, 89, 0.15); border:1px solid rgba(197, 160, 89, 0.3); color:#C5A059; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; cursor:pointer;" title="Ver descripci\xF3n">?</div>
              </div>
              <div style="font-size:10.5px; color:var(--text-muted); line-height:1.4; padding:4px 8px 0 24px; display:none;">
                Tickets asignados/retenidos que participan en rendimientos operativos pero no integran capital inicial.
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input ticket-input" style="width:60px; border:1px solid #ddd; padding:6px; border-radius:4px; text-align:center; color:#C5A059; font-weight:600; background:#f9fbfd;" 
              value="${a}" disabled title="N\xFAmero definido en Presupuesto de Egresos">
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">No Aplica (Venta $0)</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; font-weight:600; color:var(--text-muted); text-align:right;">-</td>
          <td style="padding:8px 4px; text-align:right;"></td>
        </tr>`;let T=o.variables;return o.tickets.forEach((h,A)=>{let z=T.aportaTerreno&&h.esTerrenoFijo,j=!z&&T.aportaTerreno&&h.esAportado,R=z?Math.floor((Number(T.valorTerrenoAportado)||36e6)/(Number(T.precioTicketTerreno)||36e4)):0,D=z?Number(T.precioTicketTerreno)||36e4:0,V=z?R:Number(h.cantidad)||0,J=z?D:Number(h.precio)||0,Y=V*J;c+=Y;let U=J>0&&w>0?J/w:0,q=Number(o.variables.precioMercadoActualM2)||48500,K=U>0&&q>U?(q-U)/U*100:0,Q=J>0?N/J*100:0,ae=C[h.nombre]||"Defina la estrategia para esta clase de ticket.";if(z){s+=`
        <tr style="border-bottom:1px solid #f5f5f5; background:rgba(197,160,89,0.06);">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:#C5A059; width:16px; min-width:16px; text-align:right;">\u{1F512}</span>
                <input type="text" class="form-input" style="width:100%; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
                  value="${h.nombre}${h.esAportado?" (Aportado)":" (Venta)"}" disabled>
                <span style="font-size:10px; padding:2px 8px; border-radius:3px; border:1px solid #C5A059; color:#C5A059; font-weight:700; white-space:nowrap;">FIJO</span>
              </div>
              <div style="padding:3px 0 0 24px;">
                <button onclick="App.toggleTicketAportado(${A})"
                  style="font-size:10px; padding:2px 8px; border-radius:3px; border:none; cursor:pointer; font-weight:600; ${h.esAportado?"background:rgba(197,160,89,0.15); color:#C5A059;":"background:rgba(30,41,59,0.08); color:var(--navy);"}"
                  title="Cambiar entre Venta y Aportaci\xF3n">
                  ${h.esAportado?"\u{1F3DB} Aportaci\xF3n":"\u{1F4B0} Venta"}
                </button>
                ${h.esAportado?'<span style="font-size:10px; color:var(--text-muted); margin-left:6px;">Sin comisi\xF3n</span>':""}
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input" style="width:60px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:center; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:700;"
              value="${R}" disabled>
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <input type="text" class="form-input" style="width:100px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:right; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
              value="${n(D)}" disabled>
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">${U>0?n(U):"-"}</td>
          <td style="padding:8px 4px; text-align:right; color:var(--navy); font-size:12px; font-weight:600;">${n(q)}</td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${K>30?"#C5A059":"var(--navy)"};">${K>0?"+"+K.toFixed(1)+"%":"-"}</td>
          <td style="padding:8px 12px; text-align:right; color:var(--text-muted);">-</td>
          <td style="padding:8px 4px; font-weight:700; color:#C5A059; text-align:right;">${n(Y)}</td>
          <td style="padding:8px 4px;"></td>
        </tr>`;return}if(j){let de=Number(h.cantidad)||0,H=Number(h.precio)||0,me=de*H,u=H>0&&w>0?H/w:0,E=u>0&&q>u?(q-u)/u*100:0;s+=`
        <tr style="border-bottom:1px solid #f5f5f5; background:rgba(197,160,89,0.06);">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:#C5A059; width:16px; min-width:16px; text-align:right;">\u{1F512}</span>
                <input type="text" class="form-input ticket-input" style="width:100%; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
                  value="${h.nombre}" data-index="${A}" data-field="nombre" data-is-text="true">
                <span style="font-size:10px; padding:2px 8px; border-radius:3px; border:1px solid #C5A059; color:#C5A059; font-weight:700; white-space:nowrap;">FIJO</span>
              </div>
              <div style="padding:3px 0 0 24px;">
                <button onclick="App.toggleTicketAportado(${A})"
                  style="font-size:10px; padding:2px 8px; border-radius:3px; border:none; cursor:pointer; font-weight:600; background:rgba(197,160,89,0.15); color:#C5A059;"
                  title="Quitar FIJO \u2014 convertir en fase normal">
                  \u{1F3DB} Aportaci\xF3n \u2014 quitar FIJO
                </button>
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input ticket-input" style="width:60px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:center; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:700;"
              value="${de}" data-index="${A}" data-field="cantidad">
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <input type="text" class="form-input ticket-input" style="width:100px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:right; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
              value="${n(H)}" data-index="${A}" data-field="precio">
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">${u>0?n(u):"-"}</td>
          <td style="padding:8px 4px; text-align:right; color:var(--navy); font-size:12px; font-weight:600;">${n(q)}</td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${E>30?"#C5A059":"var(--navy)"};">${E>0?"+"+E.toFixed(1)+"%":"-"}</td>
          <td style="padding:8px 12px; text-align:right; color:var(--text-muted);">-</td>
          <td style="padding:8px 4px; font-weight:700; color:#C5A059; text-align:right;">${n(me)}</td>
          <td style="padding:8px 4px;">
            <button onclick="App.removeTicketTier(${A})" style="color:#E8A090; background:none; border:none; cursor:pointer;" title="Eliminar fase">\u2715</button>
          </td>
        </tr>`;return}s+=`
        <tr style="border-bottom:1px solid #f5f5f5;">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:var(--navy); width:16px; min-width:16px; text-align:right;">${A+1}.</span>
                <input type="text" class="form-input ticket-input" style="width:100%; border:1px solid #ddd; padding:6px; border-radius:4px;"
                  value="${h.nombre}" data-index="${A}" data-field="nombre" data-is-text="true">
                <div onclick="this.parentElement.nextElementSibling.style.display = this.parentElement.nextElementSibling.style.display === 'none' ? 'block' : 'none'" style="width:22px; height:22px; border-radius:50%; background:rgba(197, 160, 89, 0.15); border:1px solid rgba(197, 160, 89, 0.3); color:#C5A059; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; cursor:pointer;" title="Ver/Ocultar descripci\xF3n">?</div>
              </div>
              <div style="font-size:10.5px; color:var(--text-muted); line-height:1.4; padding:4px 8px 0 24px; display:none;">
                ${ae}
              </div>
              <div style="padding:3px 0 0 24px;">
                <button onclick="App.toggleTicketAportado(${A})"
                  style="font-size:10px; padding:2px 8px; border-radius:3px; border:none; cursor:pointer; font-weight:600; ${h.esAportado?"background:rgba(197,160,89,0.15); color:#C5A059;":"background:rgba(30,41,59,0.08); color:var(--navy);"}"
                  title="Haz clic para cambiar entre Venta y Aportaci\xF3n">
                  ${h.esAportado?"\u{1F3DB} Aportaci\xF3n":"\u{1F4B0} Venta"}
                </button>
                ${h.esAportado?'<span style="font-size:10px; color:var(--text-muted); margin-left:6px;">Sin comisi\xF3n</span>':""}
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input ticket-input" style="width:60px; border:1px solid #ddd; padding:6px; border-radius:4px; text-align:center;"
              value="${V}" data-index="${A}" data-field="cantidad">
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <input type="text" class="form-input ticket-input" style="width:100px; border:1px solid #ddd; padding:6px; border-radius:4px; text-align:right;" 
              value="${n(J)}" data-index="${A}" data-field="precio">
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">
            ${n(U)}
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--navy); font-size:12px; font-weight:600;">
            ${n(q)}
          </td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${K>30?"#C5A059":"var(--navy)"};">
            ${K>0?"+"+K.toFixed(1)+"%":"-"}
          </td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${Q>12?"#2ecc71":"var(--navy)"};">
            ${Q>0?Q.toFixed(2)+"%":"-"}
          </td>
          <td style="padding:8px 4px; font-weight:600; color:var(--navy); text-align:right;">
            ${n(Y)}
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <button onclick="App.removeTicketTier(${A})" style="color:#E8A090; background:none; border:none; cursor:pointer;" title="Eliminar fase">\u2715</button>
          </td>
        </tr>`}),s+=`
        </tbody>
        <tfoot>
          <tr style="background:#f4f7fa; border-top:2px solid #e1e8ed;">
            <td style="text-align:right; padding:12px 8px; font-weight:600; color:var(--navy);">Suma de Tickets (Venta + Modelo):</td>
            <td style="padding:12px 4px; font-weight:700; font-size:14px; text-align:center; color:${e+a!==t?"#E8A090":"#2ecc71"};">
              ${e+a} / ${t}
            </td>
            <td colspan="5" style="text-align:right; padding:12px 8px; font-weight:500; color:var(--text-muted)">Levantamiento Bruto Proyectado:</td>
            <td style="padding:12px 4px; font-weight:600; font-size:15px; color:#C5A059; text-align:right;">${n(c)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      
      <div style="margin-top:20px; padding:16px; background:#f9fbfd; border-radius:6px; border:1px solid #e1e8ed;">
        <h4 style="font-size:12px; font-weight:600; color:var(--navy); margin-bottom:8px; text-transform:uppercase;">Par\xE1metros de Rentabilidad</h4>
        <div style="display:flex; gap:24px; font-size:12px; color:var(--text-muted);">
          <div><span style="font-weight:600; color:var(--navy);">Metros por Ticket:</span> ${w.toFixed(1)} m\xB2</div>
          <div><span style="font-weight:600; color:var(--navy);">Ingreso Anual Proyecto:</span> ${n(O)}</div>
          <div><span style="font-weight:600; color:var(--navy);">Renta Anual/Ticket:</span> ${n(N)}</div>
          <div style="margin-left:auto; color:#C5A059;"><span style="font-weight:600;">Asignados a Desarrollo:</span> ${a} tickets (${r}%)</div>
        </div>
      </div>
    </div>`,s}function Ie(){let e=o.egresos,t=(e.nominaAdmin||0)+(e.nominaVentas||0)+(e.gastosContables||0)+(e.gastosLegales||0)+(e.rentaLugar||0)+(e.gastosPublicidad||0)+(e.gastosRepresentacion||0),r=(e.acopOficina||0)+(e.acopMaqueta||0)+(e.acopRenders||0)+(e.acopFotos||0)+(e.acopMedia||0),a=o.showroomItems||[],i=a.reduce((s,c)=>s+Number(c.cantidad)*Number(c.costo),0);return`<div class="section-header">
      <div>
        <div class="section-title">Presupuesto de Egresos Levantamiento Capital</div>
        <div class="section-sub">Costos fijos, operativos y estructurales</div>
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      
      <div class="card" style="padding:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Gastos Mensuales (Operaci\xF3n Levantamiento)</h3>

        <div style="margin-bottom:20px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>Meses de Trabajo (Levantamiento)</span>
            <span id="val-mesesLevantamiento" style="font-weight:600; color:var(--navy);">${e.mesesLevantamiento} Meses</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="12" max="36" step="1" style="width:100%;" 
              value="${e.mesesLevantamiento}" data-key="mesesLevantamiento" data-nested="egresos">
            <output class="range-bubble" id="bubble-mesesLevantamiento" style="left:calc(${(e.mesesLevantamiento-12)/24*100}% + ${12-(e.mesesLevantamiento-12)/24*100*.24}px)">${e.mesesLevantamiento} Meses</output>
          </div>
        </div>
        
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">N\xF3mina Administraci\xF3n</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${n(e.nominaAdmin)}" data-key="nominaAdmin" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">N\xF3mina Ventas</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${n(e.nominaVentas)}" data-key="nominaVentas" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Gastos Contables</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${n(e.gastosContables)}" data-key="gastosContables" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Gastos Legales</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${n(e.gastosLegales)}" data-key="gastosLegales" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta del Lugar</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${n(e.rentaLugar)}" data-key="rentaLugar" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Promoci\xF3n y Publicidad</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${n(e.gastosPublicidad)}" data-key="gastosPublicidad" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Gastos de Representaci\xF3n</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${n(e.gastosRepresentacion)}" data-key="gastosRepresentacion" data-nested="egresos">
        </div>
        
        <div style="margin-top:20px; padding-top:12px; border-top:1px solid #eee; display:flex; justify-content:space-between; font-weight:600; color:var(--navy);">
          <span>Total Fijo Mensual:</span>
          <span>${n(t)}</span>
        </div>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="card" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div>
              <h3 style="font-size:14px; color:var(--navy); font-weight:500; margin:0">Inversi\xF3n Preoperativa \u2014 Showroom</h3>
              <p style="font-size:11.5px; color:var(--text-muted); margin:4px 0 0;">Equipamiento inicial para apertura del showroom de ventas.</p>
            </div>
            <button onclick="App.addShowroomItem()" style="background:var(--navy); color:white; border:none; padding:6px 12px; border-radius:5px; font-size:11px; cursor:pointer; white-space:nowrap; font-weight:500;">+ Agregar</button>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:12px;">
              <thead>
                <tr style="background:#f9fbfd; border-bottom:2px solid #e1e8ed;">
                  <th style="text-align:left; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase;">Concepto</th>
                  <th style="text-align:center; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase; width:48px;">Cant.</th>
                  <th style="text-align:right; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase; width:95px;">Costo Unit.</th>
                  <th style="text-align:right; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase; width:85px;">Subtotal</th>
                  <th style="width:22px;"></th>
                </tr>
              </thead>
              <tbody>
                ${a.map((s,c)=>`
                <tr style="border-bottom:1px solid #f0f4f8;">
                  <td style="padding:5px 4px;">
                    <input type="text" class="form-input showroom-input" style="width:100%; border:1px solid #e2e8f0; padding:4px 6px; border-radius:4px; font-size:12px;"
                      value="${s.nombre}" data-index="${c}" data-field="nombre" data-is-text="true">
                  </td>
                  <td style="padding:5px 4px; text-align:center;">
                    <input type="number" class="form-input showroom-input" style="width:42px; border:1px solid #e2e8f0; padding:4px; border-radius:4px; font-size:12px; text-align:center;"
                      value="${s.cantidad}" data-index="${c}" data-field="cantidad">
                  </td>
                  <td style="padding:5px 4px; text-align:right;">
                    <input type="text" class="form-input showroom-input" style="width:85px; border:1px solid #e2e8f0; padding:4px 6px; border-radius:4px; font-size:12px; text-align:right;"
                      value="${n(s.costo)}" data-index="${c}" data-field="costo">
                  </td>
                  <td style="padding:5px 4px; text-align:right; color:var(--navy); font-weight:600; font-size:12px;">
                    ${n(Number(s.cantidad)*Number(s.costo))}
                  </td>
                  <td style="padding:5px 4px; text-align:center;">
                    <button onclick="App.removeShowroomItem(${c})" style="color:#E8A090; background:none; border:none; cursor:pointer; font-size:14px; line-height:1;" title="Eliminar">\u2715</button>
                  </td>
                </tr>`).join("")}
              </tbody>
              <tfoot>
                <tr style="background:rgba(197,160,89,0.07); border-top:2px solid rgba(197,160,89,0.3);">
                  <td colspan="3" style="padding:8px 4px; font-size:12px; font-weight:600; color:var(--text-muted);">Total Inversi\xF3n Preoperativa:</td>
                  <td style="padding:8px 4px; text-align:right; font-size:14px; font-weight:700; color:#C5A059;">${n(i)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <div class="card" style="padding:24px;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Comisiones por Levantamiento de Capital</h3>
          
          <div style="margin-bottom:12px; margin-top:12px;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Comisi\xF3n de Ventas de Tickets (%)</label>
            <div style="display:flex; align-items:center; gap:8px;">
              <input type="number" class="form-input" style="width:100px; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${e.comisionVentasPct}" data-key="comisionVentasPct" data-nested="egresos">
              <span style="font-size:13px; color:var(--text-muted);">% sobre monto levantado</span>
            </div>
          </div>
        </div>

        <div class="card" style="padding:24px; border-left:4px solid #C5A059;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Tickets Asignados al Desarrollo</h3>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px; line-height:1.5;">Estos tickets <strong>no se venden</strong> para levantar capital; se extraen del total de venta y se asignan a los creadores del proyecto (como participaci\xF3n e incentivo operativo). Cobrar\xE1n utilidades de las rentas con el resto de inversionistas.</p>
          <div style="margin-bottom:12px;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
              <span>Porcentaje de Tickets Asignados</span>
              <span id="val-pctTicketsModelo" style="font-weight:600; color:var(--navy);">${o.variables.pctTicketsModelo||0}%</span>
            </label>
            <div class="range-container" style="margin-bottom:16px;">
              <input type="range" class="form-input" min="0" max="50" step="1" style="width:100%;" 
                value="${o.variables.pctTicketsModelo||0}" data-key="pctTicketsModelo" data-nested="variables">
              <output class="range-bubble" id="bubble-pctTicketsModelo" style="left:calc(${(o.variables.pctTicketsModelo||0)/50*100}% + ${12-(o.variables.pctTicketsModelo||0)/50*100*.24}px)">${o.variables.pctTicketsModelo||0}%</output>
            </div>
            <div style="font-size:11px; color:var(--navy); margin-top:8px; font-weight:500;">
              Total Asignado: ${Math.floor((o.variables.numTicketsMax||400)*((o.variables.pctTicketsModelo||0)/100))} tickets. (Se restan de las metas de venta).
            </div>
          </div>
        </div>
      </div>
      
    </div>`}function Se(){let e=o.variables,t=e.activeProyeccionTab||"flujo",r=Number(e.m2ComercialPB)||0,a=Number(e.rentaM2Comercial)||0,i=Number(e.m2HotelNivel1)||0,l=Number(e.rentaM2HotelNivel1)||0,s=Number(e.m2HotelNivel2)||0,c=Number(e.rentaM2HotelNivel2)||0,p=r*a+i*l+s*c,x=Number(e.cochesDiarios)||350,g=Number(e.precioPorCoche)||50,v=e.incluyeEstacionamiento!==!1?x*g*30:0,d=Number(e.aniosProyeccion)||10,b=(Number(e.inflacionAnualRentas)||0)/100,k=(Number(e.costoAdminRentasPct)||0)/100,f=Number(e.numTicketsMax)||1,y=[],_=p*12,O=v*12;for(let C=0;C<d;C++){C>0&&(_*=1+b,O*=1+b);let T=1,h=1,A=_*T,z=O*h,j=A+z,R=j*k,D=j-R,V=D/f;y.push({pctRent:T,pctEstac:h,ingresoNetoRentas:A,ingresoNetoEstac:z,costoAdmin:R,utilidadPool:D,utilidadPorTicket:V})}let m=C=>t===C?"padding:12px 24px; font-weight:600; color:var(--navy); border-bottom:2px solid var(--navy); cursor:pointer; background:rgba(30, 61, 89, 0.05); white-space:nowrap;":"padding:12px 24px; font-weight:500; color:var(--text-muted); border-bottom:2px solid transparent; cursor:pointer; white-space:nowrap;",w="";o.tickets.forEach(C=>{C.cantidad>0&&(w+=`<th style="padding:12px 16px; font-weight:600; text-align:center; border-left:1px solid #eee;">Rend. ${C.nombre}<br><span style="font-size:10px; font-weight:400; color:var(--text-muted);">${n(C.precio)}</span></th>`)});let N=`<div class="section-header">
      <div>
        <div class="section-title">Corrida Financiera</div>
        <div class="section-sub">Proyecci\xF3n a ${d} a\xF1os \xB7 Inflaci\xF3n ${(b*100).toFixed(1)}% \xB7 Costo Admin ${(k*100).toFixed(1)}%</div>
      </div>
    </div>
    <div class="card" style="padding:0; overflow:hidden;">
      <div style="display:flex; border-bottom:1px solid #eee; background:#f9fbfd; font-size:13px; overflow-x:auto;">
        <div style="${m("flujo")}" onclick="App.switchProyeccionTab('flujo')">Flujo Operativo Anual</div>
        <div style="${m("ticket")}" onclick="App.switchProyeccionTab('ticket')">Rendimiento por Fase</div>
        <div style="${m("acumulado")}" onclick="App.switchProyeccionTab('acumulado')">Recuperaci\xF3n Acumulada</div>
      </div>
      <div style="padding:24px;">`;if(t==="flujo"){let C=p*12,T=v*12;N+=`<div style="overflow-x:auto;"><table style="width:100%; text-align:right; border-collapse:collapse; font-size:${S?"10px":"13px"}; min-width:${S?"900px":"1100px"};">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600; text-align:left;">A\xF1o Operativo</th>
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ocup.<br>Renta</th>
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ingreso<br>Rentas</th>
            ${e.incluyeEstacionamiento!==!1?`<th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ocup.<br>Estac.</th>
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ingreso<br>Estacionamiento</th>`:""}
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Costo Admin.<br>(${(k*100).toFixed(1)}%)</th>
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Utilidad Neta<br>(Pool Total)</th>
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Utilidad Neta<br>/ Ticket</th>
            ${w}
          </tr>
        </thead>
        <tbody>`;for(let h=0;h<d;h++){let A=y[h],z=A.utilidadPorTicket,j="";o.tickets.forEach(R=>{if(R.cantidad>0){let D=z/(Number(R.precio)||1)*100;j+=`<td style="padding:12px 16px; font-weight:600; color:${D>12?"#2ecc71":"var(--navy)"}; text-align:center; border-left:1px solid #f5f5f5;">${D.toFixed(2)}%</td>`}}),N+=`<tr style="border-bottom:1px solid #f5f5f5; background:${h%2===0?"#fff":"#fafbfd"};">
          <td style="padding:12px 16px; text-align:left; font-weight:600; color:var(--navy);">A\xF1o ${h+1}</td>
          <td style="padding:12px 16px; font-weight:600; color:#C5A059; background:rgba(197,160,89,0.05);">${(A.pctRent*100).toFixed(0)}%</td>
          <td style="padding:12px 16px; color:var(--text-muted);">${n(A.ingresoNetoRentas)}</td>
          ${e.incluyeEstacionamiento!==!1?`<td style="padding:12px 16px; font-weight:600; color:#2ecc71; background:rgba(46,204,113,0.05);">${(A.pctEstac*100).toFixed(0)}%</td>
          <td style="padding:12px 16px; color:var(--text-muted);">${n(A.ingresoNetoEstac)}</td>`:""}
          <td style="padding:12px 16px; color:#E8A090;">\u2013 ${n(A.costoAdmin)}</td>
          <td style="padding:12px 16px; font-weight:700; color:#2ecc71;">${n(A.utilidadPool)}</td>
          <td style="padding:12px 16px; font-weight:700; color:var(--navy); background:rgba(197,160,89,0.05);">${n(z)}</td>
          ${j}
        </tr>`}N+="</tbody></table></div>"}else if(t==="ticket"){let C=y[0].utilidadPorTicket,T=d>=5?y[4].utilidadPorTicket:y[d-1].utilidadPorTicket,h=y[d-1].utilidadPorTicket;N+=`<p style="font-size:13px; color:var(--text-muted); margin-bottom:20px; line-height:1.6;">
        Rendimiento y cap rate proyectado por cada fase de inversi\xF3n, calculado sobre la utilidad neta del pool total \xF7 ${f} tickets emitidos.
      </p>
      <div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:12px 16px; text-align:left; font-weight:600;">Fase</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Precio Ticket</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Util. Anual / Ticket</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Cap Rate A\xF1o 1</th>
            ${d>=5?'<th style="padding:12px 16px; text-align:right; font-weight:600;">Cap Rate A\xF1o 5</th>':""}
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Cap Rate A\xF1o ${d}</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Recuperaci\xF3n Est.</th>
          </tr>
        </thead>
        <tbody>`,o.tickets.forEach(A=>{let z=Number(A.precio)||1,j=C/z*100,R=T/z*100,D=h/z*100,V="10+ a\xF1os",J=0;for(let Y=0;Y<d;Y++){let U=y[Y].utilidadPorTicket;if(J+U>=z){let q=(z-J)/U;V=(Y+q).toFixed(1)+" a\xF1os";break}J+=U}N+=`<tr style="border-bottom:1px solid #f5f5f5;">
          <td style="padding:12px 16px; font-weight:600; color:var(--navy);">${A.nombre}</td>
          <td style="padding:12px 16px; text-align:right;">${n(z)}</td>
          <td style="padding:12px 16px; text-align:right; color:#2ecc71; font-weight:600;">${n(C)}</td>
          <td style="padding:12px 16px; text-align:right; font-weight:700; color:${j>10?"#2ecc71":"var(--navy)"};">${j.toFixed(2)}%</td>
          ${d>=5?`<td style="padding:12px 16px; text-align:right; font-weight:700; color:${R>12?"#2ecc71":"var(--navy)"};">${R.toFixed(2)}%</td>`:""}
          <td style="padding:12px 16px; text-align:right; font-weight:700; color:#C5A059;">${D.toFixed(2)}%</td>
          <td style="padding:12px 16px; text-align:right; color:var(--text-muted);">${V} a\xF1os</td>
        </tr>`}),N+=`</tbody></table></div>
      <div style="margin-top:16px; padding:12px 16px; background:#f9fbfd; border:1px solid #e1e8ed; border-radius:6px; font-size:12px; color:var(--text-muted);">
        <strong>Notas:</strong> Inflaci\xF3n ${(b*100).toFixed(1)}% anual aplicada al ingreso bruto.
        Costo administrativo ${(k*100).toFixed(1)}% deducido del ingreso bruto.
        Ocupaci\xF3n 100% para esta proyecci\xF3n base \u2014 usa <em>Escenarios Financieros</em> para estresar el modelo.
      </div>`}else if(t==="acumulado"){let C=0;N+=`<p style="font-size:13px; color:var(--text-muted); margin-bottom:20px; line-height:1.6;">
        Muestra cu\xE1nto ha recuperado cada fase de su inversi\xF3n inicial, a\xF1o a a\xF1o. Verde = recuperaci\xF3n total del capital.
      </p>
      <div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:12px 16px; text-align:left; font-weight:600;">A\xF1o</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Utilidad Anual / Ticket</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Utilidad Acumulada</th>`,o.tickets.forEach(T=>{T.cantidad>0&&(N+=`<th style="padding:12px 16px; text-align:right; font-weight:600; border-left:1px solid #eee;">% Recup. ${T.nombre}</th>`)}),N+="</tr></thead><tbody>";for(let T=0;T<d;T++){let h=y[T].utilidadPorTicket;C+=h;let A="";o.tickets.forEach(z=>{if(z.cantidad>0){let j=C/(Number(z.precio)||1)*100,R=j>=100;A+=`<td style="padding:12px 16px; text-align:right; font-weight:700; color:${R?"#2ecc71":"var(--navy)"}; border-left:1px solid #f5f5f5; background:${R?"rgba(46,204,113,0.05)":"transparent"};">${j.toFixed(1)}%</td>`}}),N+=`<tr style="border-bottom:1px solid #f5f5f5; background:${T%2===0?"#fff":"#fafbfd"};">
          <td style="padding:12px 16px; font-weight:600; color:var(--navy);">A\xF1o ${T+1}</td>
          <td style="padding:12px 16px; text-align:right; color:#2ecc71; font-weight:600;">${n(h)}</td>
          <td style="padding:12px 16px; text-align:right; font-weight:700; color:var(--navy);">${n(C)}</td>
          ${A}
        </tr>`}N+="</tbody></table></div>"}return N+="</div></div>",N}function Fe(e){o.variables||(o.variables={}),o.variables.activeReportTab=e,$("reportes")}function Re(){let e=o.variables,t=o.egresos,r=e.activeReportTab||"ingresos",a=Number(e.capitalRequerido)||0,i=o.tickets.reduce((b,k)=>b+(Number(k.cantidad)||0)*(Number(k.precio)||0),0),l=(t.nominaAdmin||0)+(t.nominaVentas||0)+(t.gastosContables||0)+(t.gastosLegales||0)+(t.rentaLugar||0)+(t.gastosPublicidad||0)+(t.gastosRepresentacion||0),s=Number(t.mesesLevantamiento)||24,c=l*s,p=i*((t.comisionVentasPct||0)/100),x=(t.acopOficina||0)+(t.acopMaqueta||0)+(t.acopRenders||0)+(t.acopFotos||0)+(t.acopMedia||0),g=c+x+p,v=i-g,d=`<div class="section-header" style="margin-bottom:16px;">
      <div>
        <div class="section-title">Reportes e Indicadores</div>
        <div class="section-sub">M\xF3dulos Anal\xEDticos de la Estructura Inmobiliaria</div>
      </div>
    </div>
    
    <div style="display:flex; gap:12px; margin-bottom:24px; border-bottom:2px solid #eee; padding-bottom:12px;">
      <button onclick="App.switchReportTab('ingresos')" style="padding:8px 16px; border-radius:4px; font-weight:600; cursor:pointer; font-size:13px; border:none; background:${r==="ingresos"?"#C5A059":"#f0f4f8"}; color:${r==="ingresos"?"#fff":"var(--navy)"};">Ingresos Operativos</button>
      <button onclick="App.switchReportTab('construccion')" style="padding:8px 16px; border-radius:4px; font-weight:600; cursor:pointer; font-size:13px; border:none; background:${r==="construccion"?"#C5A059":"#f0f4f8"}; color:${r==="construccion"?"#fff":"var(--navy)"};">Construcci\xF3n vs Mkt</button>
      <button onclick="App.switchReportTab('plusvalia')" style="padding:8px 16px; border-radius:4px; font-weight:600; cursor:pointer; font-size:13px; border:none; background:${r==="plusvalia"?"#C5A059":"#f0f4f8"}; color:${r==="plusvalia"?"#fff":"var(--navy)"};">Plusval\xEDa Especulativa</button>
    </div>`;if(r==="ingresos")d+=`
      <div class="card" style="padding:24px; margin-bottom:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Proyecci\xF3n de Flujo Operativo a ${e.aniosProyeccion||10} A\xF1os</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px;">Este gr\xE1fico mapea la utilidad neta anual generada por las rentas de Hotel, Comercial y Estacionamiento contra la inflaci\xF3n.</p>
        <div style="height:350px; position:relative;"><canvas id="chart10A\xF1os"></canvas></div>
      </div>`;else if(r==="construccion")d+=`
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:24px;">
        <div class="card" style="padding:16px; border-left:4px solid #C5A059;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Capital Objetivo Obra</div>
          <div style="font-size:18px; font-weight:700; color:var(--navy);">${n(a)}</div>
        </div>
        <div class="card" style="padding:16px; border-left:4px solid #2ecc71;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Entradas Capital Proyectadas</div>
          <div style="font-size:18px; font-weight:700; color:#2ecc71;">${n(i)}</div>
        </div>
        <div class="card" style="padding:16px; border-left:4px solid #E8A090;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Costos Preoperativos Globales</div>
          <div style="font-size:18px; font-weight:700; color:#E8A090;">${n(g)}</div>
        </div>
        <div class="card" style="padding:16px; border-left:4px solid var(--navy);">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Presupuesto F\xEDsico Limpio</div>
          <div style="font-size:18px; font-weight:700; color:var(--navy);">${n(v)}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <div class="card" style="padding:24px;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Estructurador del Traspaso de Fondos</h3>
          <div style="height:280px; position:relative;"><canvas id="chartCapitalObj"></canvas></div>
        </div>
        <div class="card" style="padding:24px;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Desglose de Tranches (Levantamiento)</h3>
          <div style="height:280px; position:relative;"><canvas id="chartFases"></canvas></div>
        </div>
      </div>`;else if(r==="plusvalia"){let b=Math.min(Number(e.selectedPlusvaliaTicketIdx)||0,o.tickets.length-1),k=o.tickets[b]||o.tickets[0],f=k?Number(k.precio):45e4,y=(Number(e.m2ComercialPB)||0)+(Number(e.m2HotelNivel1)||0)+(Number(e.m2HotelNivel2)||0),_=Number(e.numTicketsMax)||1,O=_>0&&y>0?y/_:0,m=Number(e.precioMercadoActualM2)||48500,w=O*m;d+=`
      <div class="card" style="padding:32px; background:#f9fbfd;">
        <h3 style="font-size:16px; color:var(--navy); margin-bottom:24px; font-weight:600; text-align:center;">Delta de Valoraci\xF3n Comercial Inmediata</h3>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; text-align:center;">
          <div style="background:#fff; border:1px solid #ddd; padding:20px; border-radius:8px;">
            <div style="font-size:11px; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">Fase de Ticket Seleccionada</div>
            <select onchange="App.selectPlusvaliaTicket(this.value)" style="width:100%; border:1px solid #C5A059; padding:6px 8px; border-radius:4px; font-size:12px; font-weight:600; color:var(--navy); background:#f9fbfd; margin-bottom:10px; cursor:pointer;">
              ${o.tickets.map((N,C)=>`<option value="${C}" ${C===b?"selected":""}>${N.nombre} \u2014 ${n(N.precio)}</option>`).join("")}
            </select>
            <div style="font-size:24px; font-weight:600; color:var(--navy);">${n(f)}</div>
          </div>
          <div style="display:flex; align-items:center; justify-content:center;">
            <div style="font-size:24px; color:#C5A059;">\u2192</div>
          </div>
          <div style="background:var(--navy); border:1px solid var(--navy); padding:20px; border-radius:8px;">
            <div style="font-size:11px; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-bottom:8px;">Equivalencia F\xEDsica a Precio Retail local</div>
            <div style="font-size:24px; font-weight:700; color:#2ecc71;">${n(w)}</div>
          </div>
        </div>

        <div style="margin-top:24px; text-align:center;">
          <p style="font-size:13px; color:var(--text-muted); max-width:600px; margin:0 auto;">El diferencial expuesto indica el incremento neto patrimonial garantizado para el primer inversor tan pronto como la obra se libere al mercado bajo demanda regular (${n(m)}/m\xB2).</p>
        </div>
      </div>
      
      <div class="card" style="padding:24px; margin-top:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Gr\xE1fico Especulativo Hist\xF3rico</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px;">Representaci\xF3n te\xF3rica de plusval\xEDa del suelo (Mock Hist\xF3rico vs Ticket).</p>
        <div style="height:350px; position:relative;"><canvas id="chartPlusvalia"></canvas></div>
      </div>`}return d}function Oe(){if(!window.Chart)return;let e=o.variables,t=o.egresos,r=e.activeReportTab||"ingresos";if(r==="construccion"){let a=o.tickets.reduce((k,f)=>k+(Number(f.cantidad)||0)*(Number(f.precio)||0),0),i=(t.nominaAdmin||0)+(t.nominaVentas||0)+(t.gastosContables||0)+(t.gastosLegales||0)+(t.rentaLugar||0)+(t.gastosPublicidad||0)+(t.gastosRepresentacion||0),l=Number(t.mesesLevantamiento)||24,s=i*l,p=(t.acopOficina||0)+(t.acopMaqueta||0)+(t.acopRenders||0)+(t.acopFotos||0)+(t.acopMedia||0)+a*((t.comisionVentasPct||0)/100),x=a-s-p,g=document.getElementById("chartCapitalObj");g&&W.push(new Chart(g,{type:"doughnut",data:{labels:["Capital Neto Obra","Costo Operativo Fijo","Costo Preoperativo/Venta"],datasets:[{data:[x,s,p],backgroundColor:["var(--navy)","#C5A059","#E8A090"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{font:{family:"Montserrat",size:11}}}}}}));let v=[],d=[];for(let k of o.tickets)k.cantidad>0&&k.precio>0&&(v.push(k.nombre),d.push(k.cantidad*k.precio));let b=document.getElementById("chartFases");b&&W.push(new Chart(b,{type:"bar",data:{labels:v,datasets:[{label:"Levantamiento MXN",data:d,backgroundColor:"rgba(197, 160, 89, 0.8)",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:"#f0f0f0"},ticks:{callback:k=>"$"+(k/1e6).toFixed(1)+"M"}}}}}))}if(r==="ingresos"){let a=Number(e.aniosProyeccion)||10,i=(Number(e.inflacionAnualRentas)||0)/100,l=(Number(e.costoAdminRentasPct)||0)/100,s=Number(e.m2ComercialPB)*Number(e.rentaM2Comercial)+Number(e.m2HotelNivel1)*Number(e.rentaM2HotelNivel1)+Number(e.m2HotelNivel2)*Number(e.rentaM2HotelNivel2),c=Number(e.rentaMensualEstacionamiento)||0,x=(s+c)*12,g=[],v=[],d=[];for(let k=1;k<=a;k++){g.push("A\xF1o "+k),x=x*(1+(k===1?0:i));let y=x*(1-l);v.push(x),d.push(y)}let b=document.getElementById("chart10A\xF1os");b&&W.push(new Chart(b,{type:"line",data:{labels:g,datasets:[{label:"Ingreso Bruto Total",data:v,borderColor:"#C5A059",backgroundColor:"transparent",tension:.3,borderWidth:2},{label:"Utilidad Neta Distribuci\xF3n",data:d,borderColor:"#2ecc71",backgroundColor:"rgba(46, 204, 113, 0.1)",tension:.3,fill:!0,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{font:{family:"Montserrat",size:11}}}},scales:{y:{beginAtZero:!0,grid:{color:"#f0f0f0"},ticks:{callback:k=>"$"+(k/1e6).toFixed(1)+"M"}}}}}))}if(r==="plusvalia"){let a=["Hoy (Compra)","A\xF1o 1","A\xF1o 2","A\xF1o 3 (Appertura)"],i=document.getElementById("chartPlusvalia"),l=Math.min(Number(e.selectedPlusvaliaTicketIdx)||0,o.tickets.length-1),s=o.tickets[l]||o.tickets[0],c=s?Number(s.precio):45e4,p=(Number(e.m2ComercialPB)||0)+(Number(e.m2HotelNivel1)||0)+(Number(e.m2HotelNivel2)||0),x=Number(e.numTicketsMax)||1,g=x>0&&p>0?p/x:0,v=Number(e.precioMercadoActualM2)||48500,d=g*v,b=d-c,k=c,f=c+b*.2,y=c+b*.5,O=[k,f,y,d];i&&W.push(new Chart(i,{type:"line",data:{labels:a,datasets:[{label:"Valor Te\xF3rico Fiduciario del Ticket",data:O,borderColor:"var(--navy)",backgroundColor:"rgba(58, 28, 21, 0.1)",tension:.4,fill:!0,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{font:{family:"Montserrat",size:11}}}},scales:{y:{beginAtZero:!1,grid:{color:"#f0f0f0"}}}}}))}}function je(){let e=o.variables,t=o.egresos,r=(Number(e.m2ComercialPB)||0)+(Number(e.m2HotelNivel1)||0)+(Number(e.m2HotelNivel2)||0),a=Number(e.m2Estacionamiento)||0,i=r,l=e.aportaTerreno?0:Number(e.costoCompraTerreno)||0,c=(o.showroomItems||[]).reduce((f,y)=>f+Number(y.cantidad)*Number(y.costo),0),p=o.obraItems||[],x=p.reduce((f,y)=>f+Number(y.cantidad)*Number(y.costo),0),g=i>0?x/i:0,v=Number(t.comisionVentasPct)||0,d=o.tickets.filter(f=>!f.esAportado).reduce((f,y)=>f+Number(y.cantidad)*Number(y.precio),0),b=d*(v/100),k=x+l+c+b;return`<div class="section-header">
      <div>
        <div class="section-title">Costo de Construcci\xF3n y Preoperativos</div>
        <div class="section-sub">Presupuesto Maestro de Arranque: Obra, Terreno, Comisiones y Preoperaci\xF3n</div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px; margin-bottom:24px;">

      <div class="card" style="padding:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">1. Construcci\xF3n Civil (Obra Gris y Exteriores)</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px; line-height:1.5;">
          <strong>Nota de alcance:</strong> La volumetr\xEDa de metros cuadrados se extrae autom\xE1ticamente de los <b>Par\xE1metros Base</b>. Este presupuesto considera ejecuci\xF3n de obra gris. No incluye equipamiento interior comercial ni hotelero.
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
          <div style="background:#f9fbfd; padding:12px; border-radius:6px; border:1px solid #e1e8ed;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:8px">Desglose Superficial</label>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; color:var(--navy);"><span>\xC1rea Rentable a Construir:</span> <strong>${r.toLocaleString()} m\xB2</strong></div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; color:var(--text-muted);"><span>Estacionamiento Rentado:</span> <strong>${a.toLocaleString()} m\xB2 <span style="font-size:10px">(Excluido)</span></strong></div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:#C5A059; margin-top:8px; border-top:1px solid #ddd; padding-top:8px;"><span>Total Obra Gris:</span> <span>${i.toLocaleString()} m\xB2</span></div>
          </div>
          <div style="background:#f9fbfd; padding:12px; border-radius:6px; border:1px solid #e1e8ed;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Costo Param\xE9trico M\xB2 Construcci\xF3n</label>
            <div style="font-size:20px; font-weight:700; color:var(--navy);">${n(g)}<span style="font-size:11px; font-weight:400; color:var(--text-muted); margin-left:6px;">/m\xB2</span></div>
            <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Total detalle \xF7 ${i.toLocaleString()} m\xB2 \xB7 Solo informativo</div>
          </div>
        </div>
        <div style="padding:16px; background:rgba(30,41,59,0.03); border-radius:6px; border:1px dashed #cbd5e1; text-align:right;">
          <span style="font-size:12px; font-weight:600; color:var(--text-muted); text-transform:uppercase; margin-right:12px;">Total de Obra Civil Directa:</span>
          <span style="font-size:22px; font-weight:700; color:var(--navy);">${n(x)}</span>
        </div>
      </div>

      <div class="card" style="padding:24px; display:flex; flex-direction:column; gap:16px;">
        <h3 style="font-size:14px; color:var(--navy); font-weight:500">2. Terreno y Comisiones de Venta</h3>

        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Compra de Terreno</label>
          ${e.aportaTerreno?`<div style="padding:10px 12px; background:rgba(197,160,89,0.08); border:1px solid #C5A059; border-radius:4px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:600; color:#C5A059;">\u{1F512} TERRENO APORTADO</span>
                <span style="font-size:14px; font-weight:700; color:var(--navy);">${n(e.valorTerrenoAportado)} <span style="font-size:10px; color:var(--text-muted); font-weight:400;">(no comprado)</span></span>
               </div>`:`<input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
                value="${n(e.costoCompraTerreno)}" data-key="costoCompraTerreno" data-nested="variables" title="Usar $0 si el predio fue 100% aportado a capital">`}
        </div>

        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Comisi\xF3n de Venta sobre Entradas Proyectadas</label>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:4px; background:#f9fbfd; border:1px solid #ddd; border-radius:4px; padding:4px 8px;">
              <input type="number" class="form-input" style="width:52px; border:none; background:transparent; font-size:16px; font-weight:600; color:var(--navy); padding:4px 0; text-align:center;"
                value="${v}" data-key="comisionVentasPct" data-nested="egresos" min="0" max="100" step="0.5">
              <span style="font-size:14px; color:var(--text-muted); font-weight:600;">%</span>
            </div>
            <span style="font-size:11px; color:var(--text-muted);">\xD7 ${n(d)} <span style="font-size:10px; opacity:0.7;">(tickets vendidos)</span></span>
          </div>
          <div style="margin-top:8px; padding:8px 12px; background:rgba(197,160,89,0.08); border-radius:4px; border-left:3px solid #C5A059; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; color:var(--text-muted);">Comisi\xF3n calculada:</span>
            <span style="font-size:15px; font-weight:700; color:#C5A059;">${n(b)}</span>
          </div>
        </div>

        <div style="padding:12px; background:rgba(30,41,59,0.03); border-radius:6px; border:1px dashed #cbd5e1;">
          <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px; color:var(--text-muted);">
            <span>Terreno:</span><strong style="color:var(--navy);">${n(l)}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-muted);">
            <span>Comisiones:</span><strong style="color:#C5A059;">${n(b)}</strong>
          </div>
        </div>
      </div>

    </div>

    <div class="card" style="padding:24px; margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h3 style="font-size:14px; color:var(--navy); font-weight:500; margin:0">3. Detalle de Obra Civil</h3>
          <p style="font-size:11.5px; color:var(--text-muted); margin:4px 0 0;">Desglose de conceptos a proporcionar por el arquitecto.</p>
        </div>
        <button onclick="App.addObraItem()" style="background:var(--navy); color:white; border:none; padding:7px 14px; border-radius:5px; font-size:12px; cursor:pointer; white-space:nowrap; font-weight:500;">+ Agregar Concepto</button>
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="background:#f9fbfd; border-bottom:2px solid #e1e8ed;">
            <th style="text-align:left; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase;">Concepto</th>
            <th style="text-align:center; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase; width:70px;">Cant.</th>
            <th style="text-align:right; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase; width:130px;">Costo Unitario</th>
            <th style="text-align:right; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase; width:130px;">Subtotal</th>
            <th style="width:32px;"></th>
          </tr>
        </thead>
        <tbody>
          ${p.map((f,y)=>`
          <tr style="border-bottom:1px solid #f0f4f8;">
            <td style="padding:7px 6px;">
              <input type="text" class="form-input obra-input" style="width:100%; border:1px solid #e2e8f0; padding:5px 8px; border-radius:4px; font-size:13px;"
                value="${f.nombre}" data-index="${y}" data-field="nombre" data-is-text="true">
            </td>
            <td style="padding:7px 6px; text-align:center;">
              <input type="number" class="form-input obra-input" style="width:58px; border:1px solid #e2e8f0; padding:5px; border-radius:4px; font-size:13px; text-align:center;"
                value="${f.cantidad}" data-index="${y}" data-field="cantidad">
            </td>
            <td style="padding:7px 6px; text-align:right;">
              <input type="text" class="form-input obra-input" style="width:120px; border:1px solid #e2e8f0; padding:5px 8px; border-radius:4px; font-size:13px; text-align:right;"
                value="${f.costo>0?n(f.costo):""}" data-index="${y}" data-field="costo">
            </td>
            <td style="padding:7px 6px; text-align:right; color:var(--navy); font-weight:600;">
              ${f.costo>0?n(Number(f.cantidad)*Number(f.costo)):""}
            </td>
            <td style="padding:7px 6px; text-align:center;">
              <button onclick="App.removeObraItem(${y})" style="color:#E8A090; background:none; border:none; cursor:pointer; font-size:16px; line-height:1;" title="Eliminar">\u2715</button>
            </td>
          </tr>`).join("")}
        </tbody>
        <tfoot>
          <tr style="background:rgba(197,160,89,0.07); border-top:2px solid rgba(197,160,89,0.3);">
            <td colspan="3" style="padding:10px 6px; font-size:13px; font-weight:600; color:var(--text-muted);">Total Detalle de Obra:</td>
            <td style="padding:10px 6px; text-align:right; font-size:16px; font-weight:700; color:#C5A059;">${n(x)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="card" style="padding:24px; background:var(--navy); color:white; text-align:center;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#C5A059; margin-bottom:8px;">Presupuesto General Requerido</div>
      <div style="font-size:36px; font-weight:700; margin-bottom:16px; line-height:1; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${n(k)}</div>
      <div style="display:flex; justify-content:center; gap:32px; flex-wrap:wrap; font-size:13px; color:rgba(255,255,255,0.7);">
        <span>Obra Civil: <strong style="color:white;">${n(x)}</strong></span>
        <span>Terreno: <strong style="color:white;">${n(l)}</strong></span>
        <span>Comisiones: <strong style="color:#C5A059;">${n(b)}</strong></span>
        <span>Preoperativos: <strong style="color:#C5A059;">${n(c)}</strong></span>
      </div>
      <div style="font-size:11px; color:rgba(255,255,255,0.4); margin-top:10px;">Obra Gris + Tierra + Comisiones de Venta + Inversi\xF3n Preoperativa</div>
    </div>`}function Le(){let e=o.variables,t=(Number(e.m2ComercialPB)||0)+(Number(e.m2HotelNivel1)||0)+(Number(e.m2HotelNivel2)||0),r=Number(e.numTicketsMax)||1,a=r>0&&t>0?t/r:0,i=Math.min(Number(e.selectedPlusvaliaTicketIdx)||0,o.tickets.length-1),l=o.tickets[i]||o.tickets[0],s=l?Number(l.precio):45e4,c=Number(e.precioMercadoActualM2)||48500,p=a*c,x=p-s,g=s>0?(p/s-1)*100:0;return`<div class="section-header">
      <div>
        <div class="section-title">An\xE1lisis de Mercado y Plusval\xEDa</div>
        <div class="section-sub">Estructuraci\xF3n de equivalencia f\xEDsica y rendimiento especulativo</div>
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-bottom:24px;">
      
      <div class="card" style="padding:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Equivalencia F\xEDsica Media</h3>
        <div style="display:flex; align-items:center; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid #eee;">
          <span style="font-size:13px; color:var(--text-muted);">M\xB2 Rentables Totales del Proyecto:</span>
          <span style="font-weight:600; color:var(--navy);">${t.toFixed(1)} m\xB2</span>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; padding-top:12px;">
          <span style="font-size:13px; color:var(--text-muted);">Asignaci\xF3n Superficial por Ticket:</span>
          <span style="font-size:24px; font-weight:700; color:#C5A059;">${a.toFixed(2)} m\xB2</span>
        </div>
        <p style="font-size:11.5px; color:var(--text-muted); margin-top:16px; line-height:1.5;">
          <strong>Concepto:</strong> Aunque el ticket representa una participaci\xF3n fiduciaria, f\xEDsicamente cada inversionista tiene el goce equivalente estructural a ${a.toFixed(2)} metros cuadrados del activo productivo.
        </p>
      </div>

      <div class="card" style="padding:24px; border-top:3px solid #2ecc71;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Estimador de Costo Mercado Atual</h3>
        <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Precio Comercial actual en Zona</label>
        <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px; font-size:16px; font-weight:600; color:#2ecc71;" 
          value="${n(e.precioMercadoActualM2)}" data-key="precioMercadoActualM2" data-nested="variables">
        
        <div style="margin-top:20px; padding:12px; background:#f9fbfd; border-radius:6px;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px">Valor Comercial Estimado de la Fracci\xF3n:</div>
          <div style="font-size:20px; font-weight:700; color:var(--navy); margin-bottom:4px">${n(p)}</div>
          <div style="font-size:12px; color:var(--text-muted);">(${a.toFixed(2)} m\xB2 \xD7 ${n(c)})</div>
        </div>
      </div>

    </div>

    <div class="card" style="padding:32px; text-align:center;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:2px; color:var(--text-muted); margin-bottom:12px;">Proyecci\xF3n de Margen Especulativo</div>
      <div style="margin-bottom:16px; display:flex; justify-content:center;">
        <select onchange="App.selectPlusvaliaTicket(this.value)" style="border:1px solid #C5A059; padding:6px 12px; border-radius:4px; font-size:13px; font-weight:600; color:var(--navy); background:#f9fbfd; cursor:pointer;">
          ${o.tickets.map((v,d)=>`<option value="${d}" ${d===i?"selected":""}>${v.nombre} \u2014 ${n(v.precio)}</option>`).join("")}
        </select>
      </div>
      <div style="display:flex; justify-content:center; gap:40px; align-items:flex-end;">
        <div>
          <div style="font-size:42px; font-weight:300; color:${x>0?"#2ecc71":"#E8A090"}; line-height:1;">${x>0?"+":""}${n(x)}</div>
          <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">Plusval\xEDa Monetaria Directa</div>
        </div>
        <div style="width:1px; height:50px; background:#ddd;"></div>
        <div>
          <div style="font-size:42px; font-weight:700; color:${g>0?"#2ecc71":"#E8A090"}; line-height:1;">${g>0?"+":""}${g.toFixed(1)}%</div>
          <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">Retorno sobre Precio Ticket</div>
        </div>
      </div>
    </div>`}function _e(){let e=I,t="";return e.length===0?t='<div style="padding:24px; text-align:center; color:var(--text-muted); font-size:13px;">No hay ning\xFAn escenario guardado actualmente.</div>':e.forEach((r,a)=>{let i=JSON.stringify(o)===JSON.stringify(r.state);t+=`
          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid #eee; background:${i?"#fbfcfe":"#fff"}; border-left:${i?"4px solid #C5A059":"4px solid transparent"};">
            <div>
              <div style="font-size:15px; font-weight:600; color:var(--navy); margin-bottom:4px;">${B(r.nombre)} ${i?'<span style="font-size:10px; background:#C5A059; color:white; padding:2px 6px; border-radius:4px; margin-left:8px;">En Uso</span>':""}</div>
              <div style="font-size:11px; color:var(--text-muted);">Guardado el: ${new Date(r.timestamp).toLocaleString()}</div>
            </div>
            <div style="display:flex; gap:8px;">
              <button onclick="App.loadEscenario(${a})" class="btn-primary" style="padding:6px 12px; font-size:12px;">Cargar</button>
              <button onclick="App.deleteEscenario(${a})" style="padding:6px 12px; font-size:12px; font-weight:600; border-radius:4px; background:#E8A090; color:white; border:none; cursor:pointer;">Borrar</button>
            </div>
          </div>
        `}),`<div class="section-header">
      <div>
        <div class="section-title">Gesti\xF3n de Escenarios (Ejercicios)</div>
        <div class="section-sub">Guarda o restaura momentos espec\xEDficos de tus par\xE1metros financieros.</div>
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
      
      <div class="card" style="padding:0; overflow:hidden;">
        <div style="padding:16px; background:#f9fbfd; border-bottom:1px solid #e1e8ed;">
          <h3 style="font-size:14px; color:var(--navy); font-weight:600">Archivos Abiertos Localmente</h3>
        </div>
        <div style="max-height:400px; overflow-y:auto;">
          ${t}
        </div>
      </div>
      
      <div class="card" style="padding:24px; align-self:start;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:12px; font-weight:600">Guardar Estado Actual</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px; line-height:1.5;">Al guardar, tomar\xE1s una copia exacta de todas las hojas, precios de tickets, construcciones y egresos calculados hasta este segundo. Podr\xE1s recargarla intacta m\xE1s adelante.</p>
        
        <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Nombre del Ejercicio (Escenario)</label>
        <div style="display:flex; gap:12px;">
          <input type="text" id="nuevo-escenario-nombre" placeholder="Ej. Escenario Conservador Alta Comisi\xF3n" style="flex:1; border:1px solid #ddd; padding:10px; border-radius:4px; font-size:13px;">
          <button onclick="App.saveEscenario()" class="btn-primary" style="padding:10px 20px; font-size:13px;">Guardar</button>
        </div>
        
        <div style="margin-top:32px; padding-top:20px; border-top:1px solid #eee;">
          <h4 style="font-size:12px; font-weight:600; color:#E8A090; margin-bottom:8px;">Peligro</h4>
          <button onclick="App.resetToFactory()" style="width:100%; padding:10px; font-size:13px; font-weight:600; color:#E8A090; background:none; border:1px solid #E8A090; border-radius:4px; cursor:pointer;">Restaurar Sesi\xF3n Original (Vaciar todo)</button>
        </div>
      </div>

    </div>`}function De(){let e=o.variables,t=Number(e.aniosProyeccion)||10,r=(Number(e.inflacionAnualRentas)||0)/100,a=(Number(e.costoAdminRentasPct)||0)/100,i=Number(e.numTicketsMax)||1,l=Number(e.m2ComercialPB)||0,s=Number(e.rentaM2Comercial)||0,c=Number(e.m2HotelNivel1)||0,p=Number(e.rentaM2HotelNivel1)||0,x=Number(e.m2HotelNivel2)||0,g=Number(e.rentaM2HotelNivel2)||0,v=l*s+c*p+x*g,d=Number(e.cochesDiarios)||350,b=Number(e.precioPorCoche)||50,k=e.incluyeEstacionamiento!==!1?d*b*30:0,f=`<div class="section-header">
      <div>
        <div class="section-title">Escenarios Financieros Din\xE1micos</div>
        <div class="section-sub">Ajuste de ocupaci\xF3n anual para estresar el modelo financiero sin afectar el baseline a 100%</div>
      </div>
    </div>`;f+=`<div class="card" style="padding:24px; margin-bottom:24px; overflow-x:auto;">
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600">Configuraci\xF3n de Ocupaci\xF3n por A\xF1o</h3>
      <table style="width:100%; min-width:800px; border-collapse:collapse; font-size:12px; text-align:center;">
        <thead>
          <tr style="border-bottom:1px solid #eee;">
            <th style="padding:8px; text-align:left;">Flujo de Ingreso</th>`;for(let m=1;m<=t;m++)f+=`<th style="padding:8px;">A\xF1o ${m}</th>`;f+=`</tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:12px 8px; text-align:left; font-weight:600; color:var(--navy);">Ocupaci\xF3n Rentas M\xB2</td>`;for(let m=0;m<t;m++){let w=e.ocupacionRentas[m]||100;f+=`<td style="padding:12px 4px;">
          <div style="display:flex; flex-direction:column; align-items:center;">
            <div style="position:relative; width:100%; max-width:56px;">
              <input type="number" class="form-input" min="0" max="100" step="1" 
                value="${w}" style="width:100%; text-align:center; padding:6px 12px 6px 6px; font-weight:600; color:#C5A059;"
                onchange="App.updateOcupacion('ocupacionRentas', ${m}, this.value)">
              <span style="position:absolute; right:8px; top:50%; transform:translateY(-50%); font-size:11px; color:#C5A059; pointer-events:none;">%</span>
            </div>
          </div>
        </td>`}if(f+="</tr>",e.incluyeEstacionamiento!==!1){f+=`<tr>
            <td style="padding:12px 8px; text-align:left; font-weight:600; color:var(--navy);">Ocupaci\xF3n Estacionamiento</td>`;for(let m=0;m<t;m++){let w=e.ocupacionEstacionamiento[m]||100;f+=`<td style="padding:12px 4px;">
            <div style="display:flex; flex-direction:column; align-items:center;">
               <div style="position:relative; width:100%; max-width:56px;">
                <input type="number" class="form-input" min="0" max="100" step="1"
                  value="${w}" style="width:100%; text-align:center; padding:6px 12px 6px 6px; font-weight:600; color:#2ecc71;"
                   onchange="App.updateOcupacion('ocupacionEstacionamiento', ${m}, this.value)">
                <span style="position:absolute; right:8px; top:50%; transform:translateY(-50%); font-size:11px; color:#2ecc71; pointer-events:none;">%</span>
              </div>
            </div>
          </td>`}f+="</tr>"}f+=`
        </tbody>
      </table>
    </div>`;let y="";o.tickets.forEach(m=>{m.cantidad>0&&(y+=`<th style="padding:12px 16px; font-weight:600; text-align:center; border-left:1px solid #eee;">Rend. ${m.nombre}<br><span style="font-size:10px; font-weight:400; color:var(--text-muted);">${n(m.precio)}</span></th>`)}),f+=`
    <div class="card" style="padding:0; overflow-x:auto;">
      <table style="width:100%; text-align:right; border-collapse:collapse; font-size:${S?"10px":"12px"}; min-width:${S?"900px":"1150px"};">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600; text-align:left;">A\xF1o de Operaci\xF3n</th>
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ocup.<br>Renta</th>
            ${e.incluyeEstacionamiento!==!1?`<th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ocup.<br>Estac.</th>`:""}
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ingreso Ajustado Rentas (Bruto)</th>
            ${e.incluyeEstacionamiento!==!1?`<th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Ingreso Ajustado<br>Estacionamiento</th>`:""}
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Costo Admin. (${(a*100).toFixed(1)}%)</th>
            <th style="padding:${S?"8px 10px":"12px 16px"}; font-weight:600;">Utilidad Neta Ponderada</th>
            ${y}
          </tr>
        </thead>
        <tbody>`;let _=v*12,O=k*12;for(let m=0;m<t;m++){m>0&&(_=_*(1+r),O=O*(1+r));let w=(e.ocupacionRentas[m]!==void 0?e.ocupacionRentas[m]:100)/100,N=(e.ocupacionEstacionamiento[m]!==void 0?e.ocupacionEstacionamiento[m]:100)/100,C=_*w,T=O*N,h=C+T,A=h*a,z=h-A,j=z/i,R="";o.tickets.forEach(D=>{if(D.cantidad>0){let V=j/(Number(D.precio)||1)*100;R+=`<td style="padding:12px 16px; font-weight:600; color:var(--navy); text-align:center; border-left:1px solid #f5f5f5;">${V.toFixed(2)}%</td>`}}),f+=`
          <tr style="border-bottom:1px solid #f5f5f5;">
            <td style="padding:12px 16px; text-align:left; font-weight:500; color:var(--navy);">A\xF1o ${m+1}</td>
            <td style="padding:12px 16px; font-weight:600; color:#C5A059; background:rgba(197, 160, 89, 0.05);">${(w*100).toFixed(0)}%</td>
            ${e.incluyeEstacionamiento!==!1?`<td style="padding:12px 16px; font-weight:600; color:#2ecc71; background:rgba(46, 204, 113, 0.05);">${(N*100).toFixed(0)}%</td>`:""}
            <td style="padding:12px 16px; color:var(--text-muted);">${n(C)}</td>
            ${e.incluyeEstacionamiento!==!1?`<td style="padding:12px 16px; color:var(--text-muted);">${n(T)}</td>`:""}
            <td style="padding:12px 16px; color:#E8A090;">- ${n(A)}</td>
            <td style="padding:12px 16px; font-weight:600; color:#2ecc71;">${n(z)}</td>
            ${R}
          </tr>`}return f+=`
        </tbody>
      </table>
    </div>`,f}function ne(){let e=document.getElementById("project-selector");if(!e)return;if(oe.length===0){e.innerHTML='<div class="proj-sel-empty">Sin proyectos</div>';return}let t=oe.map(a=>`<option value="${a.id}" ${a.id===re?"selected":""}>${B(a.nombre)}</option>`).join(""),r=L==="admin"?`<button class="proj-sel-btn" onclick="App.navigate('proyectos')" title="Gestionar proyectos">
           <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
             <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
           </svg>
         </button>`:"";e.innerHTML=`<div class="proj-sel-wrap">
      <select class="proj-sel-select" onchange="App.switchProject(this.value)">${t}</select>
      ${r}
    </div>`}function ye(){let e=L==="admin";document.querySelectorAll(".nav-admin-only").forEach(r=>{r.style.display=e?"":"none"});let t=document.getElementById("user-role-badge");if(t){let r={admin:"Administrador",editor:"Editor",viewer:"Solo lectura"},a={admin:"#C5A059",editor:"#3A8F6C",viewer:"#888"};t.textContent=r[L]||L,t.style.background=a[L]||"#888"}}async function He(e){if(e!==re)try{await fetch("/api/projects/current",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectId:e})}),re=e,[o,I]=await Promise.all([fe(),be()]),o.showroomItems||(o.showroomItems=JSON.parse(JSON.stringify(P.showroomItems))),o.obraItems||(o.obraItems=JSON.parse(JSON.stringify(P.obraItems))),o.tickets.forEach(t=>{t.esAportado===void 0&&(t.esAportado=t.nombre==="Capital Tierra"),t.esTerrenoFijo===void 0&&(t.esTerrenoFijo=t.nombre==="Capital Tierra"&&t.esAportado)}),ne(),$("dashboard")}catch{alert("Error al cambiar de proyecto.")}}function Be(){let e=L==="admin";return`<div class="view-section">
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#f5f5f5;font-size:11px;text-transform:uppercase;color:#888;letter-spacing:.5px;">
          <th style="padding:10px 16px;text-align:left;">Nombre</th>
          <th style="padding:10px 16px;text-align:left;">Descripci\xF3n</th>
          <th style="padding:10px 16px;text-align:left;">Creado</th>
          <th style="padding:10px 16px;text-align:left;">Acciones</th>
        </tr></thead>
        <tbody>${oe.map(a=>{let i=a.id===re,l=new Date(a.createdAt).toLocaleDateString("es-MX");return`<tr style="background:${i?"rgba(197,160,89,.07)":"#fff"}; border-bottom:1px solid #eee;">
        <td style="padding:12px 16px; font-weight:${i?"600":"400"}; color:var(--navy);">
          ${B(a.nombre)}
          ${i?'<span style="font-size:10px;background:#C5A059;color:#fff;padding:2px 7px;border-radius:10px;margin-left:8px;">Activo</span>':""}
        </td>
        <td style="padding:12px 16px; color:#666; font-size:13px;">${B(a.descripcion)||"\u2014"}</td>
        <td style="padding:12px 16px; color:#999; font-size:12px;">${l}</td>
        <td style="padding:12px 16px; display:flex; gap:6px; flex-wrap:wrap;">
          ${i?"":`<button onclick="App.switchProject('${a.id}')" class="btn-accion btn-accion-primario">Activar</button>`}
          ${e&&!i?`<button onclick="App.deleteProject('${a.id}')" class="btn-accion btn-accion-peligro">Borrar</button>`:""}
        </td>
      </tr>`}).join("")||'<tr><td colspan="4" style="padding:24px;text-align:center;color:#999;">Sin proyectos registrados.</td></tr>'}</tbody>
      </table>
      ${e?`
      <div class="admin-form-box">
        <h3 class="admin-form-title">Nuevo Proyecto</h3>
        <div style="display:grid;gap:10px;max-width:420px;">
          <input id="new-proj-nombre" class="form-input" placeholder="Nombre del proyecto" data-is-text="1">
          <input id="new-proj-desc"   class="form-input" placeholder="Descripci\xF3n (opcional)" data-is-text="1">
          <button onclick="App.createProject()" class="btn-full-report" style="width:auto;padding:9px 20px;">Crear Proyecto</button>
        </div>
      </div>`:""}
    </div>`}function Ve(){let e={admin:"Administrador",editor:"Editor",viewer:"Solo lectura"},t={admin:"#C5A059",editor:"#3A8F6C",viewer:"#888"};return`<div class="view-section">
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#f5f5f5;font-size:11px;text-transform:uppercase;color:#888;letter-spacing:.5px;">
          <th style="padding:10px 16px;text-align:left;">Nombre</th>
          <th style="padding:10px 16px;text-align:left;">Correo</th>
          <th style="padding:10px 16px;text-align:left;">Rol</th>
          <th style="padding:10px 16px;text-align:left;">Acciones</th>
        </tr></thead>
        <tbody>${Z.map(a=>`<tr style="border-bottom:1px solid #eee;">
        <td style="padding:12px 16px; font-weight:500; color:var(--navy);">${B(a.name)}</td>
        <td style="padding:12px 16px; color:#555; font-size:13px;">${B(a.email)}</td>
        <td style="padding:12px 16px;">
          <span style="font-size:11px;background:${t[a.role]};color:#fff;padding:2px 8px;border-radius:10px;">${e[a.role]||a.role}</span>
        </td>
        <td style="padding:12px 16px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <select onchange="App.updateUserRole(${a.id}, this.value)" style="font-size:12px;padding:3px 6px;border:1px solid #ddd;border-radius:4px;cursor:pointer;">
            <option value="admin"  ${a.role==="admin"?"selected":""}>Admin</option>
            <option value="editor" ${a.role==="editor"?"selected":""}>Editor</option>
            <option value="viewer" ${a.role==="viewer"?"selected":""}>Viewer</option>
          </select>
          <button onclick="App.deleteUser(${a.id})" class="btn-accion btn-accion-peligro">Borrar</button>
        </td>
      </tr>`).join("")||'<tr><td colspan="4" style="padding:24px;text-align:center;color:#999;">Sin usuarios registrados.</td></tr>'}</tbody>
      </table>
      <div class="admin-form-box">
        <h3 class="admin-form-title">Nuevo Usuario</h3>
        <div style="display:grid;gap:10px;max-width:420px;">
          <input id="new-user-name"     class="form-input" placeholder="Nombre" data-is-text="1">
          <input id="new-user-email"    class="form-input" placeholder="Correo electr\xF3nico" data-is-text="1">
          <input id="new-user-pwd"      class="form-input" placeholder="Contrase\xF1a" type="password" data-is-text="1">
          <select id="new-user-role"    style="font-size:13px;padding:8px 10px;border:1px solid #ddd;border-radius:6px;background:#fff;">
            <option value="viewer">Solo lectura</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>
          <button onclick="App.createUser()" class="btn-full-report" style="width:auto;padding:9px 20px;">Crear Usuario</button>
        </div>
      </div>
    </div>`}async function Je(){let e=document.getElementById("new-proj-nombre")?.value.trim(),t=document.getElementById("new-proj-desc")?.value.trim();if(!e){alert("Ingresa un nombre para el proyecto.");return}let r=await fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nombre:e,descripcion:t})}),a=await r.json();if(!r.ok){alert(a.error||"Error al crear proyecto");return}oe.push({id:a.id,nombre:e,descripcion:t,createdAt:Date.now()}),ne(),$("proyectos")}async function qe(e){if(!confirm("\xBFBorrar este proyecto y todos sus datos? Esta acci\xF3n no se puede deshacer."))return;if(!(await fetch(`/api/projects/${e}`,{method:"DELETE"})).ok){alert("Error al borrar proyecto");return}oe=oe.filter(r=>r.id!==e),ne(),$("proyectos")}async function Ue(){let e=document.getElementById("new-user-name")?.value.trim(),t=document.getElementById("new-user-email")?.value.trim(),r=document.getElementById("new-user-pwd")?.value,a=document.getElementById("new-user-role")?.value;if(!t||!r){alert("Correo y contrase\xF1a son requeridos.");return}let l=await(await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,password:r,role:a})}).catch(()=>({ok:!0,json:()=>({id:Date.now()})}))).json();Z.push({id:l.id||Date.now(),name:e||t,email:t,role:a||"viewer"}),pe(),$("usuarios")}async function Ge(e){if(!confirm("\xBFEliminar este usuario permanentemente?"))return;let t=await fetch(`/api/users/${e}`,{method:"DELETE"}).catch(()=>({ok:!0}));Z=Z.filter(r=>r.id!==e),pe(),$("usuarios")}async function Ye(e,t){let r=await fetch(`/api/users/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:t})}).catch(()=>({ok:!0})),a=Z.find(i=>i.id===e);a&&(a.role=t),pe(),$("usuarios")}function Xe(){let e=document.getElementById("inv_nombre").value,t=document.getElementById("inv_correo").value,r=parseInt(document.getElementById("inv_fase").value),a=parseInt(document.getElementById("inv_tickets").value);if(!e||isNaN(r)||isNaN(a)||a<=0){alert("Por favor completa los campos obligatorios");return}let i=o.tickets.find(s=>s.id===r);if(!i)return;let l={id:Date.now(),nombre:e,correo:t,faseId:r,faseNombre:i.nombre,tickets:a,precioPactado:i.precio,montoPactado:i.precio*a,fechaRegistro:new Date().toISOString(),estatus:"Activo"};o.inversionistas||(o.inversionistas=[]),o.inversionistas.push(l),F(),$("ledger")}function We(e){confirm("\xBFEliminar inversionista y todos sus pagos asociados?")&&(o.inversionistas=o.inversionistas.filter(t=>t.id!==e),o.pagos=(o.pagos||[]).filter(t=>t.inversionistaId!==e),F(),$("ledger"))}function Ze(){let e=parseInt(document.getElementById("pago_inv").value),t=parseFloat(document.getElementById("pago_monto").value),r=document.getElementById("pago_fecha").value,a=document.getElementById("pago_metodo").value;if(isNaN(e)||isNaN(t)||t<=0||!r){alert("Completa los datos del pago");return}let i={id:Date.now()+1,inversionistaId:e,monto:t,fecha:r,metodo:a};o.pagos||(o.pagos=[]),o.pagos.push(i),F(),$("ledger")}function Ke(e){confirm("\xBFEliminar este registro de pago?")&&(o.pagos=o.pagos.filter(t=>t.id!==e),F(),$("ledger"))}function Qe(){let e=o.inversionistas||[],t=o.pagos||[],r=(o.tickets||[]).filter(s=>!s.esAportado),a=t.reduce((s,c)=>s+c.monto,0),i=e.reduce((s,c)=>s+c.montoPactado,0);return`
      <div class="section-header">
        <div>
          <div class="section-title">Levantamiento de Capital</div>
          <div class="section-sub">Seguimiento Real de Inversionistas (Ledger)</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
        <div class="kpi-card" data-tooltip="Total de capital comprometido en contratos firmados.">
          <div class="kpi-label">Comprometido <span class="info-icon">i</span></div>
          <div class="kpi-value">${n(i)}</div>
        </div>
        <div class="kpi-card status-high" data-tooltip="Capital total ingresado a caja por abonos reales.">
          <div class="kpi-label">Recaudado <span class="info-icon">i</span></div>
          <div class="kpi-value">${n(a)}</div>
        </div>
        <div class="kpi-card ${i-a>0?"status-mid":""}" data-tooltip="Saldo pendiente por cobrar de los contratos vigentes.">
          <div class="kpi-label">Por Cobrar <span class="info-icon">i</span></div>
          <div class="kpi-value">${n(i-a)}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
        <!-- Registro Inversionista -->
        <div class="card" style="padding:20px;">
          <h3 class="admin-form-title">Nuevo Inversionista</h3>
          <div class="form-grid" style="grid-template-columns: 1fr; gap:12px;">
            <div class="form-group">
              <label>Nombre Completo / Raz\xF3n Social</label>
              <input type="text" id="inv_nombre" placeholder="Ej: Juan P\xE9rez">
            </div>
            <div class="form-group">
              <label>Correo Electr\xF3nico</label>
              <input type="email" id="inv_correo" placeholder="ejemplo@correo.com">
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              <div class="form-group">
                <label>Fase de Entrada</label>
                <select id="inv_fase">
                  ${r.map(s=>`<option value="${s.id}">${s.nombre} (${n(s.precio)})</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label>Tickets</label>
                <input type="number" id="inv_tickets" value="1" min="1">
              </div>
            </div>
            <button class="btn-primary" onclick="App.addInversionista()" style="width:100%; margin-top:8px;">Registrar Inversionista</button>
          </div>
        </div>

        <!-- Registro de Pago -->
        <div class="card" style="padding:20px;">
          <h3 class="admin-form-title">Registrar Abono / Pago</h3>
          <div class="form-grid" style="grid-template-columns: 1fr; gap:12px;">
            <div class="form-group">
              <label>Inversionista</label>
              <select id="pago_inv">
                ${e.map(s=>`<option value="${s.id}">${s.nombre}</option>`).join("")}
              </select>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              <div class="form-group">
                <label>Monto del Abono</label>
                <input type="number" id="pago_monto" placeholder="$ 0">
              </div>
              <div class="form-group">
                <label>Fecha</label>
                <input type="date" id="pago_fecha" value="${new Date().toISOString().split("T")[0]}">
              </div>
            </div>
            <div class="form-group">
              <label>M\xE9todo de Pago</label>
              <select id="pago_metodo">
                <option value="Transferencia">Transferencia</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Aportaci\xF3n">Aportaci\xF3n</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <button class="btn-primary" onclick="App.addPago()" style="width:100%; margin-top:8px;">Confirmar Pago</button>
          </div>
        </div>
      </div>

      <!-- Tabla de Inversionistas -->
      <div class="card" style="margin-bottom:24px;">
        <div style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:13px; font-weight:600; margin:0;">Seguimiento de Socios</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Inversionista</th>
              <th>Fase</th>
              <th class="text-right">Tickets</th>
              <th class="text-right">Pactado</th>
              <th class="text-right">Pagado</th>
              <th class="text-right">Saldo</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${e.length===0?'<tr><td colspan="7" class="text-center" style="padding:30px; color:var(--text-muted);">No hay inversionistas registrados a\xFAn.</td></tr>':""}
            ${e.map(s=>{let c=t.filter(g=>g.inversionistaId===s.id).reduce((g,v)=>g+v.monto,0),p=s.montoPactado-c,x=p<=0?"value-high":"value-mid";return`
                <tr>
                  <td>
                    <div style="font-weight:600; color:var(--navy);">${B(s.nombre)}</div>
                    <div style="font-size:10px; color:var(--text-muted);">${B(s.correo)}</div>
                  </td>
                  <td><span class="status-indicator">${s.faseNombre}</span></td>
                  <td class="text-right">${s.tickets}</td>
                  <td class="text-right">${n(s.montoPactado)}</td>
                  <td class="text-right ${x}">${n(c)}</td>
                  <td class="text-right ${p>0?"value-low":""}">${n(p)}</td>
                  <td class="text-center">
                    <button class="btn-table-action" onclick="App.deleteInversionista(${s.id})" title="Eliminar inversionista">\u{1F5D1}</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>

      <!-- Libro Diario (\xDAltimos pagos) -->
      <div class="card">
        <div style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05);">
          <h3 style="font-size:13px; font-weight:600; margin:0;">Libro Diario de Pagos</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Inversionista</th>
              <th>Fase</th>
              <th>M\xE9todo</th>
              <th class="text-right">Monto</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${t.length===0?'<tr><td colspan="6" class="text-center" style="padding:30px; color:var(--text-muted);">No se han registrado pagos todav\xEDa.</td></tr>':""}
            ${t.sort((s,c)=>new Date(c.fecha)-new Date(s.fecha)).map(s=>{let c=e.find(p=>p.id===s.inversionistaId)||{nombre:"N/A",faseNombre:"N/A"};return`
                <tr>
                  <td>${s.fecha}</td>
                  <td style="font-weight:600;">${B(c.nombre)}</td>
                  <td>${B(c.faseNombre)}</td>
                  <td><span class="status-indicator">${B(s.metodo)}</span></td>
                  <td class="text-right" style="font-weight:700; color:var(--status-high);">${n(s.monto)}</td>
                  <td class="text-center">
                    <button class="btn-table-action" onclick="App.deletePago(${s.id})" title="Eliminar pago">\u{1F5D1}</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    `}let he={dashboard:Pe,parametros:ze,tickets:Me,egresos:Ie,construccion:je,plusvalia:Le,proyeccion:Se,escenarios:_e,"escenarios-financieros":De,reportes:Re,proyectos:Be,usuarios:Ve,ledger:Qe},et={dashboard:"Proyectos 4L",parametros:"Par\xE1metros Base",tickets:"Estrategia de Tickets",egresos:"Presupuesto Operativo",construccion:"Costos de Construcci\xF3n",plusvalia:"Plusval\xEDa y Mercado",proyeccion:"Corrida Financiera",escenarios:"Gesti\xF3n de Escenarios","escenarios-financieros":"Escenarios Financieros",reportes:"Reportes e Indicadores",proyectos:"Gesti\xF3n de Proyectos",usuarios:"Gesti\xF3n de Usuarios",ledger:"Libro de Inversiones"};function tt(){W.forEach(e=>e.destroy()),W=[]}function $(e){he[e]||(e="dashboard"),G=e,X++;let t=X;document.querySelectorAll(".nav-item").forEach(i=>i.classList.toggle("active",i.dataset.view===e));let r=document.getElementById("content-title");r&&(r.textContent=et[e]||e);let a=document.getElementById("content-body");if(a){tt();try{a.innerHTML=he[e]()}catch(i){console.error('Render error for view "'+e+'":',i),a.innerHTML='<div style="padding:32px; color:#c00;">Error al renderizar vista. Recarga la p\xE1gina.<br><small>'+B(i.message)+"</small></div>";return}ut(),e==="reportes"&&setTimeout(()=>{X===t&&Oe()},50)}else console.error("content-body element not found in DOM")}function ot(e){let t=e.target;if(t.classList.contains("showroom-input")){let i=parseInt(t.dataset.index),l=t.dataset.field;if(o.showroomItems||(o.showroomItems=[]),l==="nombre")o.showroomItems[i][l]=t.value;else{let s=parseFloat(String(t.value).replace(/[$,\s]/g,""));o.showroomItems[i][l]=isNaN(s)?0:s}F(),$("egresos");return}if(t.classList.contains("obra-input")){let i=parseInt(t.dataset.index),l=t.dataset.field;if(o.obraItems||(o.obraItems=[]),l==="nombre")o.obraItems[i][l]=t.value;else{let s=parseFloat(String(t.value).replace(/[$,\s]/g,""));o.obraItems[i][l]=isNaN(s)?0:s}F(),$("construccion");return}if(t.classList.contains("ticket-input")){let i=t.dataset.index,l=t.dataset.field;if(t.dataset.isText)o.tickets[i][l]=t.value;else{let s=parseFloat(String(t.value).replace(/[$,\\s]/g,""));o.tickets[i][l]=isNaN(s)?0:s}F(),$("tickets");return}let r=t.dataset.key,a=t.dataset.nested;if(r){if(t.dataset.isText){let i=xe(r,t.value,!0);if(!i.valid){le(t,i.message);return}ge(t),a?(o[a]||(o[a]={}),o[a][r]=t.value):o[r]=t.value}else{let i=parseFloat(String(t.value).replace(/[$,\\s]/g,""));if(isNaN(i)){le(t,"Debe ser un n\xFAmero v\xE1lido");return}let l=xe(r,i,!1);if(!l.valid){if(le(t,l.message),l.clamped!==void 0){let s=l.clamped;a?(o[a]||(o[a]={}),o[a][r]=s):o[r]=s}return}ge(t),a?(o[a]||(o[a]={}),o[a][r]=i):o[r]=i}F(),o.variables.aportaTerreno&&(r==="valorTerrenoAportado"||r==="precioTicketTerreno")&&(we(),F()),["egresos","parametros","construccion","plusvalia","proyeccion","tickets","reportes"].includes(G)&&$(G)}}function at(){o.tickets.push({id:Date.now(),nombre:"Nueva Fase",cantidad:0,precio:0}),F(),$("tickets")}function it(e){o.tickets.splice(e,1),F(),$("tickets")}function we(){let e=o.variables,t=Number(e.valorTerrenoAportado)||36e6,r=Number(e.precioTicketTerreno)||36e4,a=Math.floor(t/r),i=o.tickets.find(l=>l.esTerrenoFijo);i&&(i.cantidad=a,i.precio=r)}function rt(){o.variables||(o.variables={}),o.variables.aportaTerreno=!o.variables.aportaTerreno,o.variables.aportaTerreno&&we(),F(),$(G)}function nt(){o.variables||(o.variables={}),o.variables.incluyeEstacionamiento=o.variables.incluyeEstacionamiento===!1,F(),$(G)}function st(e){o.variables||(o.variables={}),o.variables.selectedPlusvaliaTicketIdx=parseInt(e),F(),$(G)}function dt(){o.showroomItems||(o.showroomItems=[]),o.showroomItems.push({nombre:"Nuevo Concepto",cantidad:1,costo:0}),F(),$("egresos")}function lt(e){o.showroomItems&&(o.showroomItems.splice(e,1),F(),$("egresos"))}function ct(){o.obraItems||(o.obraItems=[]),o.obraItems.push({nombre:"",cantidad:1,costo:0}),F(),$("construccion")}function pt(e){o.obraItems&&(o.obraItems.splice(e,1),F(),$("construccion"))}function mt(e){o.tickets[e]&&(o.tickets[e].esAportado=!o.tickets[e].esAportado,F(),$("tickets"))}function ut(){let e=document.getElementById("content-body");e&&e.querySelectorAll(".form-input").forEach(t=>{t.addEventListener("change",ot),t.type==="range"&&t.addEventListener("input",xt)})}function xt(e){let t=e.target,r=t.dataset.key,a=document.getElementById("val-"+r),i=document.getElementById("bubble-"+r);if(!a&&!i)return;let l=t.value;if(r==="aniosProyeccion"?l+=" A\xF1os":r==="mesesLevantamiento"?l+=" Meses":l+="%",a&&(a.textContent=l),i){i.textContent=l;let s=parseFloat(t.min)||0,c=parseFloat(t.max)||100,x=(parseFloat(t.value)-s)/(c-s)*100;i.style.left=`calc(${x}% + ${12-x*.24}px)`}}async function Et(e,t,r){let a=[];[e,...e.querySelectorAll("*")].forEach(i=>{let l=window.getComputedStyle(i);(l.overflow!=="visible"||l.overflowX!=="visible"||l.overflowY!=="visible")&&(a.push({node:i,ov:i.style.overflow,ox:i.style.overflowX,oy:i.style.overflowY}),i.style.overflow="visible",i.style.overflowX="visible",i.style.overflowY="visible")});try{return await html2canvas(e,{scale:t||2.4,useCORS:!0,allowTaint:!0,backgroundColor:r||"#ffffff",logging:!1,foreignObjectRendering:!1,scrollX:0,scrollY:0})}finally{a.forEach(({node:i,ov:l,ox:s,oy:c})=>{i.style.overflow=l,i.style.overflowX=s,i.style.overflowY=c})}}function ke(e,t,r,a,i,l,s,c){let p=r-i*2,x=a-i*3,g=t.width/t.height,v=p,d=v/g;d>x&&(d=x,v=d*g);let b=i+(p-v)/2,k=i+6+(x-d)/2;e.saveGraphicsState(),e.setGState(new e.GState({opacity:.03})),e.setFontSize(40),e.setTextColor(30,41,59),e.text("PROYECTOS 4L \xB7 PROYECTOS 4L \xB7 PROYECTOS 4L",r/2,a/2,{align:"center",angle:45}),e.restoreGraphicsState(),e.addImage(t.toDataURL("image/jpeg",.95),"JPEG",b,k,v,d),e.setFillColor(30,41,59),e.rect(i,i,2,8,"F"),e.setFontSize(8),e.setTextColor(30,41,59),e.setFont("Montserrat","bold"),e.text(l?l.toUpperCase():"",i+4,i+6),e.setFont("Montserrat","normal");let f=o.variables&&o.variables.proyecto?o.variables.proyecto:"L&L";e.setTextColor(160,160,160),e.text(f.toUpperCase(),r-i,i+6,{align:"right"});let y=a-i;e.setDrawColor(220,220,220),e.line(i,y-4,r-i,y-4),e.setFontSize(7),e.setTextColor(180,180,180),e.text(`CONFIDENCIAL \xB7 PROPIEDAD DE PROYECTOS 4L \xB7 ${new Date().getFullYear()}`,i,y),e.text(`P\xC1GINA ${s} DE ${c}`,r-i,y,{align:"right"}),e.setTextColor(197,160,89),e.text("ESTE DOCUMENTO ES UNA SIMULACI\xD3N FINANCIERA Y NO REPRESENTA UNA OFERTA VINCULANTE.",r/2,y,{align:"center"})}function $e(e){return new Promise((t,r)=>{let a=Date.now(),i=()=>{if(typeof html2canvas<"u"&&window.jspdf){t();return}if(Date.now()-a>(e||1e4)){r(new Error("Librer\xEDas de PDF no disponibles"));return}setTimeout(i,200)};i()})}async function gt(){let e=document.getElementById("content-body");if(!e){alert("No hay contenido para exportar.");return}try{await $e(8e3)}catch{alert("Librer\xEDas de PDF a\xFAn cargando. Intenta de nuevo en unos segundos.");return}let t=document.querySelector('[onclick="App.exportCurrentViewToPDF()"]');t&&(t.textContent="\u23F3 Generando...",t.style.opacity="0.6",t.style.pointerEvents="none");let r=!1;try{r=document.body.classList.contains("dark-mode"),r&&document.body.classList.remove("dark-mode"),document.body.classList.add("pdf-export-active"),S=!0,$(G),await new Promise(k=>setTimeout(k,600));let a=e.scrollWidth,i=e.scrollHeight,l=await html2canvas(e,{scale:2,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",logging:!1,foreignObjectRendering:!1,scrollX:0,scrollY:0,width:a,height:i,windowWidth:a,windowHeight:i}),{jsPDF:s}=window.jspdf,c=7,x=l.width/l.height>=.8?"landscape":"portrait",g=x==="landscape"?297:210,v=x==="landscape"?210:297,d=new s({unit:"mm",format:"a4",orientation:x});ke(d,l,g,v,c,G.toUpperCase(),1,1);let b=o.variables&&o.variables.proyecto?o.variables.proyecto.replace(/\s+/g,"_"):"vista";d.save(`${G}-${b}.pdf`)}catch{alert("Error al generar el PDF. Intenta de nuevo.")}finally{S=!1,document.body.classList.remove("pdf-export-active"),r&&document.body.classList.add("dark-mode"),$(G),t&&(t.textContent="Vista actual",t.style.opacity="",t.style.pointerEvents="")}}async function vt(){try{await $e(8e3)}catch{alert("Librer\xEDas de PDF a\xFAn cargando. Intenta de nuevo en unos segundos.");return}let e=document.getElementById("btn-full-report"),{jsPDF:t}=window.jspdf,r=297,a=210,i=8,l=new Date().toLocaleDateString("es-MX"),s=o.variables&&o.variables.proyecto?o.variables.proyecto:"Proyecto 4L",c=G,p={activeParamTab:o.variables.activeParamTab,activeProyeccionTab:o.variables.activeProyeccionTab,activeReportTab:o.variables.activeReportTab},x=document.createElement("div");x.style.cssText="position:fixed;inset:0;background:rgba(30,41,59,0.95);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;",x.innerHTML=`
      <div style="font-size:20px;font-weight:700;color:#C5A059;font-family:sans-serif;">Generando Presentaci\xF3n PDF</div>
      <div id="pdf-prog" style="font-size:13px;color:rgba(255,255,255,0.7);font-family:sans-serif;">Preparando portada...</div>
      <div style="width:340px;height:6px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden;">
        <div id="pdf-bar" style="height:100%;width:2%;background:linear-gradient(90deg,#C5A059,#e8c870);border-radius:3px;transition:width 0.4s;"></div>
      </div>
      <div id="pdf-page-label" style="font-size:11px;color:rgba(255,255,255,0.35);font-family:sans-serif;"></div>`,document.body.appendChild(x),e&&(e.disabled=!0);let g=(m,w,N)=>{let C=document.getElementById("pdf-prog"),T=document.getElementById("pdf-bar"),h=document.getElementById("pdf-page-label");C&&(C.textContent=m),T&&(T.style.width=Math.max(2,w)+"%"),h&&(h.textContent=N||"")},v=[{view:"dashboard",title:"Dashboard"},{view:"parametros",title:"Par\xE1metros \u2014 Generales",set:{activeParamTab:"generales"}},{view:"parametros",title:"Par\xE1metros \u2014 Rentas y Tarifas",set:{activeParamTab:"rentas"}},...o.variables.incluyeEstacionamiento!==!1?[{view:"parametros",title:"Par\xE1metros \u2014 Estacionamiento",set:{activeParamTab:"estacionamiento"}}]:[],{view:"parametros",title:"Par\xE1metros \u2014 Estructura Fiduciaria",set:{activeParamTab:"fiduciaria"}},{view:"tickets",title:"Estrategia de Tickets"},{view:"egresos",title:"Presupuesto de Egresos"},{view:"construccion",title:"Costo de Construcci\xF3n y Preoperativos"},{view:"plusvalia",title:"An\xE1lisis de Plusval\xEDa y Mercado"},{view:"proyeccion",title:"Corrida \u2014 Flujo Operativo Anual",set:{activeProyeccionTab:"flujo"}},{view:"proyeccion",title:"Corrida \u2014 Rendimiento por Fase",set:{activeProyeccionTab:"ticket"}},{view:"proyeccion",title:"Corrida \u2014 Recuperaci\xF3n Acumulada",set:{activeProyeccionTab:"acumulado"}},{view:"reportes",title:"Reportes \u2014 Ingresos Operativos",set:{activeReportTab:"ingresos"}},{view:"reportes",title:"Reportes \u2014 Construcci\xF3n vs Mercado",set:{activeReportTab:"construccion"}},{view:"reportes",title:"Reportes \u2014 Plusval\xEDa Especulativa",set:{activeReportTab:"plusvalia"}},{view:"escenarios-financieros",title:"Escenarios Financieros"}],d=new t({unit:"mm",format:"a4",orientation:"landscape"}),b=d.GState;d.setFillColor(25,35,50),d.rect(0,0,r,a,"F"),d.setDrawColor(197,160,89),d.setLineWidth(.5),d.rect(i,i,r-i*2,a-i*2,"S");let k=null;try{let m=document.querySelector(".brand-logo-wrap img");if(m&&m.complete){let w=document.createElement("canvas");w.width=m.naturalWidth,w.height=m.naturalHeight,w.getContext("2d").drawImage(m,0,0),k=w.toDataURL("image/png");let N=45,C=N*(w.width/w.height);d.addImage(k,"PNG",(r-C)/2,40,C,N)}}catch{}d.setTextColor(197,160,89),d.setFont("Montserrat","normal"),d.setFontSize(10),d.text("ESTRATEGIA PATRIMONIAL & FINANCIERA",r/2,95,{align:"center",charSpace:3}),d.setTextColor(255,255,255),d.setFontSize(28),d.setFont("Montserrat","bold"),d.text(s.toUpperCase(),r/2,115,{align:"center",charSpace:1}),d.setDrawColor(197,160,89),d.setLineWidth(1),d.line(r/2-40,125,r/2+40,125),d.setFontSize(14),d.setFont("Montserrat","normal"),d.setTextColor(180,180,180),d.text("LIBERTAD \xB7 LOCURA \xB7 LIDERAZGO \xB7 LEGADO",r/2,140,{align:"center",charSpace:2}),d.setFontSize(10),d.setTextColor(100,110,130),d.text(`MEXICO, ${new Date().getFullYear()}  |  REPORTE DE INVERSI\xD3N`,r/2,180,{align:"center"}),d.addPage(),d.setFillColor(250,250,250),d.rect(0,0,r,a,"F"),d.setFillColor(30,41,59),d.rect(i,i,2,12,"F"),d.setFontSize(18),d.setTextColor(30,41,59),d.setFont("Montserrat","bold"),d.text("CONTENIDO DEL REPORTE",i+6,i+9),d.setFontSize(10),d.setFont("Montserrat","normal"),d.setTextColor(100,100,100),d.text("Haz clic en cualquier secci\xF3n para navegar directamente.",i+6,i+16);let f=i+30,y=i+10,_=r/2+10;v.forEach((m,w)=>{let N=w>=Math.ceil(v.length/2),C=N?_:y,T=N?i+30+(w-Math.ceil(v.length/2))*10:i+30+w*10;d.setFillColor(197,160,89),d.circle(C-5,T-1,1,"F"),d.setTextColor(30,41,59),d.setFontSize(11),d.text(m.title,C,T),m.pageNumInPdf=w+3,d.link(C,T-4,80,6,{pageNumber:m.pageNumInPdf})});let O=!1;try{O=document.body.classList.contains("dark-mode"),O&&document.body.classList.remove("dark-mode"),document.body.classList.add("pdf-export-active");for(let m=0;m<v.length;m++){let w=v[m];g(w.title,Math.round((m+.5)/v.length*100),`P\xE1gina ${m+1} de ${v.length}`),w.set&&Object.assign(o.variables,w.set),S=!0,$(w.view);let N=w.view==="reportes"||w.view==="proyeccion"||w.view==="dashboard"?600:300;await new Promise(J=>setTimeout(J,N));let C=document.getElementById("content-body");if(!C)continue;let T=C.scrollWidth,h=C.scrollHeight,A=await html2canvas(C,{scale:2,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",logging:!1,foreignObjectRendering:!1,scrollX:0,scrollY:0,width:T,height:h,windowWidth:T,windowHeight:h}),j=A.width/A.height>=.8?"landscape":"portrait",R=j==="landscape"?297:210,D=j==="landscape"?210:297;d.addPage({orientation:j,format:"a4"});let V=v.length+2;ke(d,A,R,D,i,w.title,m+3,V),g(w.title,Math.round((m+1)/v.length*100),`P\xE1gina ${m+3} de ${V} \u2014 OK`)}d.save(`reporte-${s.replace(/\s+/g,"_")}.pdf`)}catch(m){console.error("Error al generar presentaci\xF3n:",m),alert("Error al generar la presentaci\xF3n. Abre la consola para m\xE1s detalles.")}finally{S=!1,document.body.classList.remove("pdf-export-active"),O&&document.body.classList.add("dark-mode"),Object.assign(o.variables,p),$(c),document.body.removeChild(x),e&&(e.disabled=!1,e.textContent="\u{1F4CA} Generar Presentaci\xF3n PDF")}}async function ft(){try{await fetch("/api/logout",{method:"POST"})}catch{}let e=document.getElementById("login-portal");e&&(e.style.display="flex",e.classList.remove("lp-exit"),document.getElementById("lp-email").value="",document.getElementById("lp-pwd").value="",e.style.animation="none",e.offsetHeight,e.style.animation=""),localStorage.removeItem("lyl_mock_auth");let t=document.getElementById("lp-btn"),r=document.getElementById("lp-btn-text"),a=document.getElementById("lp-btn-spin");t&&(t.disabled=!1),r&&(r.style.display=""),a&&(a.style.display="none")}function bt(){let e=document.getElementById("nuevo-escenario-nombre");if(!e)return;let r={nombre:e.value.trim()||"Escenario sin nombre",timestamp:Date.now(),state:JSON.parse(JSON.stringify(o))};I.push(r),fetch("/api/escenarios",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).catch(()=>{localStorage.setItem("lil_escenarios_db",JSON.stringify(I))}),$("escenarios")}function yt(e){I[e]&&(o=JSON.parse(JSON.stringify(I[e].state)),F(),$("escenarios"))}function ht(e){confirm("\xBFEst\xE1s seguro de que deseas borrar este ejercicio guardado?")&&(e<0||e>=I.length||(I.splice(e,1),fetch(`/api/escenarios/${e}`,{method:"DELETE"}).catch(()=>{localStorage.setItem("lil_escenarios_db",JSON.stringify(I))}),$("escenarios")))}function Ce(){confirm("\u26A0\uFE0F PELIGRO: Esto borrar\xE1 todos tus cambios actuales y restaurar\xE1 el modelo Financiero a sus valores base. Tus 'Ejercicios' guardados NO se borrar\xE1n. \xBFContinuar?")&&(o=JSON.parse(JSON.stringify(P)),F(),$("dashboard"))}function wt(){alert("Modulo de Exportaci\xF3n CSV en construcci\xF3n para el Modelo Inmobiliario")}function kt(){let e=document.getElementById("app-layout");if(e){let t=e.classList.toggle("sidebar-collapsed");localStorage.setItem("lil_sidebar_collapsed",t?"1":"0")}}function $t(e,t,r){o.variables[e]||(o.variables[e]=Array(20).fill(100));let a=Number(r);isNaN(a)&&(a=100),a<0&&(a=0),a>100&&(a=100),o.variables[e][t]=a,F(),$("escenarios-financieros")}function Ct(e){o.variables||(o.variables={}),o.variables.activeParamTab=e,$("parametros")}function At(e){o.variables||(o.variables={}),o.variables.activeProyeccionTab=e,$("proyeccion")}async function Nt(){try{let e=JSON.parse(localStorage.getItem("lyl_mock_auth")||"null");L=e?.role||"admin";try{let a=localStorage.getItem("lyl_bienraiz_state");o=(a?JSON.parse(a):null)||JSON.parse(JSON.stringify(P))}catch{o=JSON.parse(JSON.stringify(P))}try{I=JSON.parse(localStorage.getItem("lil_escenarios_db")||"[]")}catch{I=[]}try{let a=localStorage.getItem("lil_users_db");Z=a?JSON.parse(a):[]}catch{Z=[]}o.variables||(o.variables=JSON.parse(JSON.stringify(P.variables))),o.tickets||(o.tickets=JSON.parse(JSON.stringify(P.tickets))),o.egresos||(o.egresos=JSON.parse(JSON.stringify(P.egresos))),o.showroomItems||(o.showroomItems=JSON.parse(JSON.stringify(P.showroomItems))),o.obraItems||(o.obraItems=JSON.parse(JSON.stringify(P.obraItems)));let t=!1;Array.isArray(o.tickets)&&o.tickets.forEach(a=>{a.esAportado===void 0&&(a.esAportado=a.nombre==="Capital Tierra",t=!0),a.esTerrenoFijo===void 0&&(a.esTerrenoFijo=a.nombre==="Capital Tierra"&&a.esAportado,t=!0)}),t&&F();let r=document.getElementById("app-layout");r&&(r.classList.toggle("role-viewer",L==="viewer"),r.classList.toggle("role-admin",L==="admin"),r.classList.toggle("role-editor",L==="editor")),ne(),ye(),document.querySelectorAll(".nav-item[data-view]").forEach(a=>a.addEventListener("click",()=>$(a.dataset.view))),document.addEventListener("focus",a=>{let i=a.target;if(!i.matches("input.form-input")||i.dataset.isText)return;let l=parseFloat(String(i.value).replace(/[$,\s]/g,""));isNaN(l)||(i.value=l)},!0),document.addEventListener("blur",a=>{let i=a.target;if(!i.matches("input.form-input")||i.dataset.isText)return;let l=parseFloat(String(i.value).replace(/[$,\s]/g,""));isNaN(l)||(i.value=ce.format(l))},!0),$("dashboard");try{let[a,i,l,s]=await Promise.all([fetch("/api/check-auth",{signal:AbortSignal.timeout(5e3)}).then(g=>g.json()).catch(()=>({})),fe(),be(),Ee()]);e&&!a.authenticated&&Object.assign(a,e,{authenticated:!0});let c=a.role||L;re=a.currentProjectId||null,oe=a.projects||[],Array.isArray(s)&&s.length>0&&(Z=s),Array.isArray(l)&&(I=l);let p=i&&JSON.stringify(i)!==JSON.stringify(o),x=c!==L;if(p&&(o=i),x){L=c;let g=document.getElementById("app-layout");g&&(g.classList.toggle("role-viewer",L==="viewer"),g.classList.toggle("role-admin",L==="admin"),g.classList.toggle("role-editor",L==="editor")),ye()}(p||x)&&(ne(),$(G))}catch{}}catch(e){console.error("Critical Init Error:",e),o=JSON.parse(JSON.stringify(P)),$("dashboard")}}return{init:Nt,navigate:$,exportCSV:wt,exportCurrentViewToPDF:gt,exportFullReport:vt,toggleSidebar:kt,addTicketTier:at,removeTicketTier:it,addShowroomItem:dt,removeShowroomItem:lt,addObraItem:ct,removeObraItem:pt,toggleTicketAportado:mt,toggleAportaTerreno:rt,toggleIncluyeEstacionamiento:nt,selectPlusvaliaTicket:st,saveEscenario:bt,loadEscenario:yt,deleteEscenario:ht,resetToFactory:Ce,resetState:Ce,switchReportTab:Fe,switchParamTab:Ct,switchProyeccionTab:At,updateOcupacion:$t,logout:ft,toggleTheme:()=>{let e=document.body.classList.toggle("dark-mode");localStorage.setItem("lyl_theme",e?"dark":"light")},switchProject:He,createProject:Je,deleteProject:qe,createUser:Ue,deleteUser:Ge,updateUserRole:Ye,addInversionista:Xe,deleteInversionista:We,addPago:Ze,deletePago:Ke}})();window.App=ve;ve.init().catch(function(P){console.error("App.init fall\xF3:",P);try{ve.navigate("dashboard")}catch{}});})();
